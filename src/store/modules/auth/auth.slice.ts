import { createSlice } from '@reduxjs/toolkit';

import { AUTH_STATE_KEY } from './auth.const';
import { setAccessToken, resetAuthInfo } from './auth.reducers';
import type { AuthState } from './auth.types';

export const initialState: AuthState = {
    accessToken: null,
};

export const authSlice = createSlice({
    name: AUTH_STATE_KEY,
    initialState,
    reducers: {
        setAccessToken,
        resetAuthInfo,
    },
});

export const reducer = authSlice.reducer;
