import persistReducer from 'redux-persist/es/persistReducer';

import { authReducer } from '@store/modules/auth';
import { authPersistConfig } from '@store/rootPersistConfigs';

export const authAuthPersistReducer = persistReducer(authPersistConfig, authReducer);
