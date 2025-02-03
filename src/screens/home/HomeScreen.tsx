import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WalletExpenseContainer from '@/container/wallet-expense-container/WalletExpenseContainer';
import WalletsEmptyContainer from '@/container/wallets-empty-container/WalletsEmptyContainer';
import { useGetExpenseQuery } from '@api/queries/expense/useGetEspenseQuery';
import { useGetWalletsQuery } from '@api/queries/wallet/useGetWalletsQuery';
import colors from '@common/colors';
import { Wallet } from '@model/wallet';

/**
 * Home Screen
 *
 */
const HomeScreen = () => {
    const [selectedWallet, setSelectedWallet] = useState<Wallet>();

    const selectedWalletId = selectedWallet?.id;

    const { data: walletResp } = useGetWalletsQuery();

    const { data: expensesResp } = useGetExpenseQuery(selectedWalletId ?? -1, {
        enabled: !!selectedWalletId,
    });

    const wallets = walletResp?.data.wallets;
    const expenses = expensesResp?.data;

    useEffect(() => {
        // TO DO: handle more wallet
        if (wallets?.length) {
            setSelectedWallet(wallets[0]);
        }
    }, [wallets]);

    const renderContent = useMemo(() => {
        if (wallets === undefined || expenses === undefined) {
            return <ActivityIndicator size="small" color="#00ff00" />;
        }

        if (wallets?.length === 0) {
            return <WalletsEmptyContainer />;
        }

        if (expenses?.length === 0) {
            return <WalletsEmptyContainer />;
        }

        if (wallets[0] && expenses) {
            return <WalletExpenseContainer wallet={wallets[0]} expenses={expenses} />;
        }
    }, [expenses, wallets]);

    /**
     * Main redner
     */
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.pampas }}>
            {renderContent}
        </SafeAreaView>
    );
};

export default HomeScreen;
