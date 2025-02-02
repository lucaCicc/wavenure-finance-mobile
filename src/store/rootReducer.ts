import { AUTH_STATE_KEY } from '@store/modules/auth';
import { authAuthPersistReducer } from '@store/rootPersistReducers';

const reducer = {
    [AUTH_STATE_KEY]: authAuthPersistReducer,
};

export default reducer;
