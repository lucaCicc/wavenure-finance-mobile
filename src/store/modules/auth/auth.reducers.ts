import type { CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import type { AuthState } from './auth.types';

export const setAccessToken: CaseReducer<AuthState, PayloadAction<AuthState['accessToken']>> = (
    state,
    action
) => {
    state.accessToken = action.payload;
};

export const resetAuthInfo: CaseReducer<AuthState> = () => ({
    accessToken: null,
});
