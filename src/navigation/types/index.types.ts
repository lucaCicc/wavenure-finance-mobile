import { NavigatorScreenParams } from '@react-navigation/native';

import { AuthStackParamList } from '@navigation/types/auth.types';
import { TabBarStackParamList } from '@navigation/types/tab.types';

/**
 * Screen names
 */
export enum MainStack {
    TAB_BAR_STACK = 'TabBarStack',
    AUTH_STACK = 'AuthStack',
}

/**
 * Stack Params
 */
export type MainStackParamList = {
    [MainStack.TAB_BAR_STACK]: NavigatorScreenParams<TabBarStackParamList>;
    [MainStack.AUTH_STACK]: NavigatorScreenParams<AuthStackParamList>;
};
