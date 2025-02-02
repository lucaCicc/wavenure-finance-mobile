import type { Storage } from 'redux-persist';

import { SyncStorageService } from '@services/SyncStorageService';
import { AUTH_STATE_KEY } from '@store/modules/auth';

/**
 * Wrapper to use mmkv sync storage with redux-persist
 *
 * @see https://github.com/mrousavy/react-native-mmkv/blob/master/docs/WRAPPER_REDUX.md
 */
const reduxStorage: Storage = {
    setItem: (key, value) => {
        SyncStorageService.getInstance().set(key, value);

        return Promise.resolve(true);
    },
    getItem: (key) => {
        const value = SyncStorageService.getInstance().getString(key);

        return Promise.resolve(value);
    },
    removeItem: (key) => {
        SyncStorageService.getInstance().delete(key);

        return Promise.resolve();
    },
};

export const authPersistConfig = {
    key: AUTH_STATE_KEY,
    version: 1,
    storage: reduxStorage,
    timeout: 0,
};
