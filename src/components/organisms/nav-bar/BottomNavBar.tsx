import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TabActions } from '@react-navigation/native';
import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import BottomTabBar from '@components/organisms/tabs/tab-bottom-bar';
import { TabScreen } from '@navigation/types/tab.types';

import { getBottomNavBarItems } from './bottom-nav-bar.const';
import styles from './bottom-nav-bar.styles';

export type Props = BottomTabBarProps;

const bottomNavBarItems = getBottomNavBarItems();

/**
 *
 *
 */
export const BottomNavBar: FunctionComponent<Props> = ({ state, navigation }) => {
    const currentRouteName = state?.routes && (state?.routes[state?.index ?? 0]?.name as TabScreen);

    const onSelectTab = useCallback(
        (tabName: TabScreen) => {
            if (currentRouteName !== tabName) {
                // Triggers a popToPop if there are nested Stacks
                const event = navigation.emit({
                    type: 'tabPress',
                    target: tabName,
                    canPreventDefault: true,
                });

                if (!event.defaultPrevented) {
                    navigation.dispatch({
                        ...TabActions.jumpTo(tabName),
                        target: state.key,
                    });
                }
            }
        },
        [currentRouteName, navigation, state.key]
    );

    return (
        <View>
            <BottomTabBar
                style={styles.bottomTabBarContainer}
                items={bottomNavBarItems}
                selectedTab={currentRouteName}
                onTabPress={onSelectTab}
            />
        </View>
    );
};

BottomNavBar.displayName = 'BottomNavBar';

export default BottomNavBar;
