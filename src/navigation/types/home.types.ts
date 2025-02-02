import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { MainStackParamList } from '@navigation/types/index.types';
import { TabBarStackParamList, TabScreen } from '@navigation/types/tab.types';

/**
 * Screen names
 */
export enum HomeScreen {
    HOME = 'HomeScreen',
}

/**
 * Screen Nav Props
 */
export type HomeNavProps = CompositeScreenProps<
    NativeStackScreenProps<MainStackParamList>,
    NativeStackScreenProps<TabBarStackParamList, TabScreen.HOME>
>;
