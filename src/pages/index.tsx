import React, {ReactElement, lazy, Suspense, LazyExoticComponent} from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import {AuthRoutes} from '@pages/auth-routes';
import {GuestRoutes} from '@pages/guest-routes';
import {Loading} from '@pages/loading';

// Pages
import {Home} from "@pages/home";

const SignIn = lazy(() => import('@pages/sign-in').then(module => ({default: module.SignIn})));

export const Pages = (): ReactElement => {

    // Lazy load wrapper
    const LazyWrapper = ({Page}: { Page: LazyExoticComponent<() => ReactElement> }): ReactElement => (
        <Suspense fallback={<Loading/>}>
            <Page/>
        </Suspense>
    );

    return (
        <Routes>
            {/* Authenticated routes */}
            <Route element={<AuthRoutes/>}>
                <Route path='/' element={<Home/>}/>
            </Route>
            {/* Guest only routes */}
            <Route element={<GuestRoutes/>}>
                <Route path='/sign-in' element={<LazyWrapper Page={SignIn}/>}/>
            </Route>
            {/* Not found */}
            <Route path='*' element={<Navigate to='/' replace={true}/>}/>
        </Routes>
    )
}