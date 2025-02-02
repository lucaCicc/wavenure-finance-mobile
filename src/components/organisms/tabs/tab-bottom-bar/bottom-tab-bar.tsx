import React from 'react';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import BottomTabBarItem from '@components/organisms/tabs/tab-bottom-bar/bottom-tab-bar.item';

import styles from './bottom-tab-bar.styles';
import type { BottomTabBarItemSpec } from './bottom-tab-bar.types';

export interface Props<T> extends ViewProps {
    items: BottomTabBarItemSpec<T>[];
    selectedTab: T;
    onTabPress: (id: T) => void;
    tabStyles?: StyleProp<ViewStyle>;
}

/**
 *
 *
 */
export const BottomTabBar = <T extends string>({
    style,
    tabStyles,
    items,
    selectedTab,
    onTabPress,
    ...otherProps
}: Props<T>) => {
    const { bottom: safeAreaBottom } = useSafeAreaInsets();

    return (
        <View
            style={[styles.bottomTabBar, { paddingBottom: safeAreaBottom }, style]}
            {...otherProps}>
            <View style={styles.rowLine} />
            <View style={[styles.tabsWrapper, tabStyles]}>
                {items.map(({ id, icon, label }) => (
                    <BottomTabBarItem
                        key={id}
                        testID={id}
                        iconName={icon}
                        text={label}
                        isSelected={selectedTab === id}
                        onPress={() => onTabPress(id)}
                    />
                ))}
            </View>
        </View>
    );
};

BottomTabBar.displayName = 'BottomTabBar';

export default BottomTabBar;
