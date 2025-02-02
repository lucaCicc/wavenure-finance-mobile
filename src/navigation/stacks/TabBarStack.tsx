import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';

import colors from '@common/colors';
import { BottomNavBar } from '@components/organisms/nav-bar';
import { TabScreen, type TabBarStackParamList } from '@navigation/types/tab.types';
import BudgetScreen from '@screens/budget/Budget';
import HomeScreen from '@screens/home/Home';
import OthersScreen from '@screens/others/Others';
import WalletsScreen from '@screens/wallets/Wallets';

const Tab = createBottomTabNavigator<TabBarStackParamList>();

const BottomTabNav = () => (
    <Tab.Navigator
        sceneContainerStyle={styles.bottomTabStackContainer}
        tabBar={(props) => <BottomNavBar {...props} />}
        screenOptions={{
            headerShown: false,
        }}>
        <Tab.Screen
            options={{
                tabBarTestID: TabScreen.HOME,
                lazy: false,
            }}
            name={TabScreen.HOME}
            component={HomeScreen}
        />
        <Tab.Screen
            options={{
                tabBarTestID: TabScreen.WALLETS,
                lazy: false,
            }}
            name={TabScreen.WALLETS}
            component={WalletsScreen}
        />
        <Tab.Screen
            options={{
                tabBarTestID: TabScreen.BUDGEST,
                lazy: false,
            }}
            name={TabScreen.BUDGEST}
            component={BudgetScreen}
        />
        <Tab.Screen
            options={{
                tabBarTestID: TabScreen.OTHERS,
                lazy: false,
            }}
            name={TabScreen.OTHERS}
            component={OthersScreen}
        />
    </Tab.Navigator>
);

const styles = StyleSheet.create({
    bottomTabStackContainer: {
        backgroundColor: colors.solidWhite,
    },
});

export default BottomTabNav;
