import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@store/rootStore';

import { AUTH_STATE_KEY } from './auth.const';

const mainSelector = (state: RootState) => state[AUTH_STATE_KEY];

export const getAuth = (state: RootState) => mainSelector(state);

export const getAccessToken = createSelector(mainSelector, (authInfo) => authInfo.accessToken);

export const getIsLogged = createSelector(mainSelector, (authInfo) => {
    const { accessToken } = authInfo || {};

    // TO DO: Check is token expired

    return !!accessToken;
});
