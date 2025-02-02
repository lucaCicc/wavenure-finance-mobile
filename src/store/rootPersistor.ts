import { persistStore } from 'redux-persist';

import store from './rootStore';

export default persistStore(store);
