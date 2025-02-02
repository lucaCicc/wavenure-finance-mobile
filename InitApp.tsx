import * as SplashScreen from 'expo-splash-screen';
import React, { Suspense } from 'react';

import useInitApp from './src/hooks/useInitApp';

const LazyApp = React.lazy(() => import('./App'));

SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function InitApp() {
    const { appIsReady } = useInitApp();

    if (!appIsReady) {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <LazyApp />
        </Suspense>
    );
}
