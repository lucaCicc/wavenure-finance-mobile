import { BudgetScreen } from '@navigation/types/budget.types';
import { HomeScreen } from '@navigation/types/home.types';
import { OthersScreen } from '@navigation/types/others.types';
import { WalletsScreen } from '@navigation/types/wallet.types';

/**
 * Screen names
 */
export enum TabScreen {
    HOME = HomeScreen.HOME,
    WALLETS = WalletsScreen.WALLETS,
    BUDGEST = BudgetScreen.BUDGEST,
    OTHERS = OthersScreen.OTHERS,
}

/**
 * Stack Params
 */
export type TabBarStackParamList = {
    [TabScreen.HOME]: undefined;
    [TabScreen.WALLETS]: undefined;
    [TabScreen.BUDGEST]: undefined;
    [TabScreen.OTHERS]: undefined;
};
