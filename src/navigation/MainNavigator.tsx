import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import React, { forwardRef, useImperativeHandle, useCallback, useRef } from 'react';

import Logger from '@helper/logger';

import MainStack from './stacks/MainStack';

export interface NavigatorRefProps {
    getNavigatorRef(): NavigationContainerRefWithCurrent<any>;
}

interface MainNavigatorProps {
    onNavigationReadyCb: () => void;
}

/**
 *
 *
 */
const MainNavigator = forwardRef<NavigatorRefProps, MainNavigatorProps>(
    ({ onNavigationReadyCb }, ref) => {
        const navigationRef = useNavigationContainerRef();
        const currentRouteNameRef = useRef<string>();

        useImperativeHandle(
            ref,
            () => ({
                getNavigatorRef() {
                    return navigationRef;
                },
            }),
            [navigationRef]
        );

        /**
         *
         */
        const trackScreen = useCallback((_?: string, currentRouteName?: string) => {
            Logger.info({
                file: 'MainNavigator.tsx',
                functionName: 'trackScreen',
                message: `Route name - ${currentRouteName}`,
                colorMessage: '\x1b[96m\x1b[1m',
            });
        }, []);

        /**
         *
         */
        const onNavigationStateChange = useCallback(async () => {
            if (navigationRef) {
                const navigationRouteName = navigationRef.getCurrentRoute()?.name;

                if (currentRouteNameRef.current !== navigationRouteName) {
                    trackScreen(currentRouteNameRef.current, navigationRouteName);

                    currentRouteNameRef.current = navigationRouteName;
                }
            }
        }, [navigationRef, trackScreen]);

        /**
         *
         */
        const onNavigationReady = useCallback(() => {
            if (navigationRef) {
                currentRouteNameRef.current = navigationRef.getCurrentRoute()?.name;
            }

            trackScreen(currentRouteNameRef.current, currentRouteNameRef.current);
            onNavigationReadyCb();
        }, [navigationRef, onNavigationReadyCb, trackScreen]);

        /**
         * Render Navigation
         *
         */
        return (
            <NavigationContainer
                ref={navigationRef}
                onReady={onNavigationReady}
                onStateChange={onNavigationStateChange}>
                <MainStack />
            </NavigationContainer>
        );
    }
);

MainNavigator.displayName = 'MainNavigator';

export default React.memo(MainNavigator);
