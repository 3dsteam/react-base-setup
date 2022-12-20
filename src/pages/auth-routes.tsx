import React, {ReactElement, useEffect} from 'react';
import {useStoreDispatch, useStoreSelector} from '@store/index';
import {expire} from '@store/auth';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {rest} from "@api/rest";
import {ItemMenu, Menu} from "@components/menu";

export const AuthRoutes = (): ReactElement => {

    // Store
    const auth = useStoreSelector(state => state.auth);
    const dispatch = useStoreDispatch();

    // Hooks
    const location = useLocation();

    // Menu items
    const menuItems: ItemMenu[] = [
        {
            type: 'page',
            text: 'Home',
            icon: 'fa-regular fa-home',
            path: '/',
            viewInBottomBar: true
        },
        {
            type: 'page',
            text: 'Logout',
            icon: 'fa-regular fa-right-from-bracket',
            callback: () => dispatch(expire())
        }
    ]

    /**
     * Get JWT Expiration
     * @param token
     */
    const getJwtExp = (token: string): number => {
        const jwtObjects = token.split('.');
        if (jwtObjects.length === 0) return 0;
        const decoded = window.atob(jwtObjects[1]);
        return JSON.parse(decoded).exp * 1000;
    };

    /**
     * Check if JWT is expired
     * @param token
     */
    const isJwtExpired = (token: string): boolean => {
        return Date.now() >= getJwtExp(token);
    };

    /**
     * Set expiration call at timeout
     * @param token
     */
    const setTimeoutExpiration = (token: string) => {
        // Check if token is not expired
        if (!isJwtExpired(token)) {
            // Prepare timeout for expiration
            const timer = getJwtExp(token) - Date.now();
            // Set timeout
            const timeout = setTimeout(() => {
                // Expire session
                dispatch(
                    expire()
                );
            }, timer < 2147483647 ? timer : 2147483647);
            // Clear on exit
            return () => clearTimeout(timeout);
        } else {
            // Expire session
            dispatch(
                expire()
            );
        }
    };

    // Init
    useEffect(() => {
        // Check if authenticated
        if (auth.data) {
            // Add token to axios request
            rest.defaults.headers.common['Authorization'] = `Bearer ${auth.data.token}`;
            // Set timeout expiration
            setTimeoutExpiration(auth.data.token);
        } else {
            // Remove authorization header
            rest.defaults.headers.common['Authorization'] = '';
        }
    }, [auth]);

    return (
        <>
            {
                auth.data
                    ? <Menu
                        items={menuItems}
                    >
                        <div className='auth-container'>
                            {/* Page content */}
                            <Outlet/>
                        </div>
                    </Menu>
                    : <Navigate to='/sign-in' state={{from: location.pathname}} replace={true}/>
            }
        </>
    );
};