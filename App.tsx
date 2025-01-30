import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';

import Main from './src/Main';
import { commonStyle } from './src/common/styles';
import Logger from './src/helpers/logger';

/**
 * Load App
 *
 */
export default function App() {
    /**
     *
     */
    const onNavigationReady = useCallback(async () => {
        Logger.info({
            file: 'App.tsx',
            message: `Navigation Ready!`,
        });

        await SplashScreen.hideAsync();
    }, []);

    /**
     * Main render
     *
     */
    return (
        <SafeAreaProvider>
            <StatusBar translucent />
            <SafeAreaInsetsContext.Consumer>
                {(_) => (
                    <GestureHandlerRootView style={commonStyle.flex}>
                        <Main onNavigationReadyCb={onNavigationReady} />
                    </GestureHandlerRootView>
                )}
            </SafeAreaInsetsContext.Consumer>
        </SafeAreaProvider>
    );
}
