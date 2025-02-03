import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Wallet, WalletExpense } from '@model/wallet';
import { MainStackParamList } from '@navigation/types/index.types';

/**
 * Screen names
 */
export enum SharedScreen {
    CREATE_WALLET = 'CreateWalletScreen',
    DETAILS_WALLET = 'DetailsWalletScreen',
    CREATE_EXPENSE = 'CreateExpense',
    UDPATE_EXPENSE = 'UpdateExpense',
}

/**
 * Stack Params
 */
export type SharedStackParamList = {
    [SharedScreen.CREATE_WALLET]: {
        wallet: Wallet;
    };
    [SharedScreen.UDPATE_EXPENSE]: {
        expense: WalletExpense;
    };
    [SharedScreen.CREATE_EXPENSE]: {
        wallet: Wallet;
    };
    [SharedScreen.DETAILS_WALLET]: {
        wallet: Wallet;
    };
};

/**
 * Screen Nav Props
 */
export type CreateWalletNavProps = CompositeScreenProps<
    NativeStackScreenProps<SharedStackParamList, SharedScreen.CREATE_WALLET>,
    NativeStackScreenProps<MainStackParamList>
>;

export type DetailsWalletNavProps = CompositeScreenProps<
    NativeStackScreenProps<SharedStackParamList, SharedScreen.DETAILS_WALLET>,
    NativeStackScreenProps<MainStackParamList>
>;

export type CreateExpensetNavProps = CompositeScreenProps<
    NativeStackScreenProps<SharedStackParamList, SharedScreen.CREATE_EXPENSE>,
    NativeStackScreenProps<MainStackParamList>
>;

export type UpdateExpensetNavProps = CompositeScreenProps<
    NativeStackScreenProps<SharedStackParamList, SharedScreen.UDPATE_EXPENSE>,
    NativeStackScreenProps<MainStackParamList>
>;
