import {createSlice} from '@reduxjs/toolkit';
import { name } from '../../../package.json';
import {getLocalStorage, removeLocalStorage, setLocalStorage} from "../../utils/local-storage";

export interface AuthState {
	data: AuthDataState | null
}

export interface AuthDataState {
	/**
	 * JWT token
	 */
	token: string
	/**
	 * User data
	 */
	user: unknown
	/**
	 * Set auth only for this current session
	 * With refresh, the user must re-authenticate.
	 */
	isSessionOnly?: boolean
}

// Load initial state from localStorage
let initialState: AuthState = {data: null};
const _local = getLocalStorage(name + '-authentication', true);
if (_local) initialState = {data: _local} as AuthState;

// Auth slice
const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticate: (state: AuthState, action) => {
			// Flag for not save session
			if (!action.payload.isSessionOnly) {
				setLocalStorage(name + '-authentication', action.payload, true);
			}
			// Update state
			state.data = action.payload;
		},
		expire: (state: AuthState) => {
			// Clear authentication
			removeLocalStorage(name + '-authentication');
			// Update state
			state.data = null;
		}
	}
});

export default slice.reducer;
export const {authenticate, expire} = slice.actions;

export const getAuthToken = (): string | null => {
	const _local = getLocalStorage(name + '-authentication', true);
	return _local?.token || null;
}
