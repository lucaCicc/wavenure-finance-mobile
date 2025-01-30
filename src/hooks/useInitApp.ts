import {
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from '@expo-google-fonts/inter';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

import Logger from '@helper/logger';

/*
 * This hook is used to initialize the app
 *
 */
const useInitApp = () => {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                // Load Font
                await Font.loadAsync({
                    Inter_900Black,
                    Inter_100Thin,
                    Inter_200ExtraLight,
                    Inter_300Light,
                    Inter_400Regular,
                    Inter_500Medium,
                    Inter_600SemiBold,
                    Inter_700Bold,
                    Inter_800ExtraBold,
                });

                // Other...
            } catch (error) {
                Logger.error(
                    {
                        file: 'useInitApp.tsx',
                    },
                    error
                );
            } finally {
                Logger.info({
                    file: 'useInitApp.tsx',
                    message: `Init app end!`,
                });
                setAppIsReady(true);
            }
        };

        init();
    }, []);

    return {
        appIsReady: appIsReady,
    };
};

export default useInitApp;
