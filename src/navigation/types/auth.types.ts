import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList } from '@navigation/types/index.types';

/**
 * Screen names
 */
export enum AuthScreen {
    LOGIN = 'LoginScreen',
}

/**
 * Stack Params
 */
export type AuthStackParamList = {
    [AuthScreen.LOGIN]: undefined;
};

/**
 * Screen Nav Props
 */
export type AuthNavProps = CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList>,
    NativeStackScreenProps<MainStackParamList>
>;
