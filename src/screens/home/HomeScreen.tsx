import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import EspenseEmptyContainer from '@/container/espense-empty/EspenseEmptyContainer';
import WalletExpenseContainer from '@/container/wallet-expense-container/WalletExpenseContainer';
import WalletsEmptyContainer from '@/container/wallets-empty-container/WalletsEmptyContainer';
import { ExpenseFilter, useGetExpenseQuery } from '@api/queries/expense/useGetEspenseQuery';
import { useGetWalletsQuery } from '@api/queries/wallet/useGetWalletsQuery';
import colors from '@common/colors';
import { Wallet } from '@model/wallet';

/**
 * Home Screen
 *
 */
const HomeScreen = () => {
    const [selectedWallet, setSelectedWallet] = useState<Wallet>();
    const [filter, setFilter] = useState<ExpenseFilter>();
    const selectedWalletId = selectedWallet?.id;

    // Query
    const { data: walletResp, isLoading: isLoadingWallets } = useGetWalletsQuery();

    const { data: expensesResp, isLoading: isExpenseWallets } = useGetExpenseQuery(
        selectedWalletId ?? -1,
        {
            enabled: selectedWalletId !== undefined,
        },
        filter
    );

    const wallets = walletResp?.data.wallets;
    const expenses = expensesResp?.data;

    useEffect(() => {
        // TO DO: handle more wallet
        if (wallets?.length) {
            setSelectedWallet(wallets[0]);
        }
    }, [wallets]);

    /**
     *
     */
    const renderContent = useMemo(() => {
        if (isLoadingWallets || isExpenseWallets) {
            return <ActivityIndicator size="small" color={colors.riper} />;
        }
        if (!wallets?.length) {
            return <WalletsEmptyContainer />;
        }

        if (!expenses?.length && selectedWallet && !filter) {
            return <EspenseEmptyContainer wallet={selectedWallet} />;
        }

        if (selectedWallet && expenses) {
            return (
                <WalletExpenseContainer
                    wallet={selectedWallet}
                    expenses={expenses ?? []}
                    applyFilter={setFilter}
                />
            );
        }
    }, [expenses, filter, isExpenseWallets, isLoadingWallets, selectedWallet, wallets]);

    /**
     * Main redner
     *
     */
    return <SafeAreaView style={styles.container}>{renderContent}</SafeAreaView>;
};

/**
 * Styles
 *
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pampas,
    },
});

export default HomeScreen;
