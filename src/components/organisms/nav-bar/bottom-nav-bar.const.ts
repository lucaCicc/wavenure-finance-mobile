import { BottomTabBarItemSpec } from '@components/organisms/tabs/tab-bottom-bar';
import { TabScreen } from '@navigation/types/tab.types';

export const getBottomNavBarItems = (): BottomTabBarItemSpec<TabScreen>[] => [
    {
        id: TabScreen.HOME,
        icon: 'home',
        label: 'Home',
    },
    {
        id: TabScreen.WALLETS,
        icon: 'wallet',
        label: 'Wallet',
    },
    {
        id: TabScreen.BUDGEST,
        icon: 'budget',
        label: 'Budget',
    },
    {
        id: TabScreen.OTHERS,
        icon: 'others',
        label: 'Others',
    },
];
