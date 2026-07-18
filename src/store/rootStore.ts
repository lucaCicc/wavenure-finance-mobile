import type { Middleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const middleware: Middleware[] = [/* add middlewares */];

if (__DEV__) {
    /* add dev check */
}

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
