import * as SplashScreen from 'expo-splash-screen';
import React from 'react';

import App from './App';
import useInitApp from './src/hooks/useInitApp';

SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function InitApp() {
    const { appIsReady } = useInitApp();

    if (!appIsReady) {
        return null;
    }

    return <App />;
}
