import React, {ReactElement} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useStoreSelector} from '@store/index';

export const GuestRoutes = (): ReactElement => {

	// Store
	const auth = useStoreSelector(state => state.auth);

	// Hooks
	const location = useLocation();

	return (
		<>
			{
				!auth.data
					? <Outlet/>
					: <Navigate to={(location.state as { from: string })?.from || '/'} replace={true}/>
			}
		</>
	);
};