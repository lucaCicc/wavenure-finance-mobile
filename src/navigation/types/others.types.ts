import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList } from '@navigation/types/index.types';
import { TabBarStackParamList, TabScreen } from '@navigation/types/tab.types';

/**
 * Screen names
 */
export enum OthersScreen {
    OTHERS = 'OthersScreen',
}

/**
 * Screen Nav Props
 */
export type WalletsNavProps = CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList>,
    NativeStackScreenProps<TabBarStackParamList, TabScreen.WALLETS>
>;
