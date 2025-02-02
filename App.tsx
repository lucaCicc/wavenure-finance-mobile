import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Main from './src/Main';
import queryClient from './src/api/queryClient';
import { commonStyle } from './src/common/styles';
import Logger from './src/helpers/logger';
import rootPersistor from './src/store/rootPersistor';
import rootStore from './src/store/rootStore';

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
        <QueryClientProvider client={queryClient}>
            <Provider store={rootStore}>
                <PersistGate persistor={rootPersistor}>
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
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    );
}
