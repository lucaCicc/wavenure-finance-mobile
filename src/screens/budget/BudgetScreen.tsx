import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BadgetEmptyContainer from '@/container/badget-empty/BadgetEmpty';
import { useGetBudgetListQuery } from '@api/queries/budget/useGetBudgetListQuery';
import { useGetExpenseQuery } from '@api/queries/expense/useGetEspenseQuery';
import { useGetWalletsQuery } from '@api/queries/wallet/useGetWalletsQuery';
import colors from '@common/colors';
import { commonStyle } from '@common/styles';
import Text from '@components/atoms/text';
import LinearProgressBar from '@components/molecules/progress-bar-linear';
import { ExpenseCategory, WalletExpense } from '@model/wallet';

/**
 *
 *
 */
const BudgetScreen = () => {
    const isFocused = useIsFocused();

    const { data: wallets } = useGetWalletsQuery();
    const wallet = wallets?.data?.wallets[0];
    const { data: budgetData, isLoading } = useGetBudgetListQuery();
    const budget = budgetData?.data?.[0];

    const { data: expenseData, refetch } = useGetExpenseQuery(
        wallet?.id ?? -1,
        {
            enabled: !!wallet?.id,
        },
        {
            category: budget?.category,
        }
    );

    useEffect(() => {
        refetch();
    }, [isFocused, refetch]);

    const sumExpensesByCategory = useCallback(
        (expenses?: WalletExpense[], category?: ExpenseCategory): number => {
            if (expenses && category) {
                return expenses
                    .filter(
                        (expense) => expense.category === category && expense.type === 'EXPENSE'
                    )
                    .reduce((total, expense) => total + expense.amount, 0);
            }

            return 0;
        },
        []
    );

    const currentValue = useMemo(
        () => sumExpensesByCategory(expenseData?.data, budget?.category),
        [budget?.category, expenseData?.data, sumExpensesByCategory]
    );

    const percentage = useMemo(() => {
        if (budget?.amount) {
            const sum = sumExpensesByCategory(expenseData?.data, budget.category);

            return Math.round((sum / budget.amount) * 100 * 10) / 10;
        }

        return 0;
    }, [budget?.amount, budget?.category, expenseData?.data, sumExpensesByCategory]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.containerLoading}>
                <ActivityIndicator size="large" color={colors.riper} />
            </SafeAreaView>
        );
    }

    /**
     * Main render
     *
     */
    return (
        <SafeAreaView style={styles.container}>
            <Text variant="title" variantStyle="h2" style={commonStyle.marginBottom10}>
                I tuoi Budget
            </Text>

            {budget && (
                <Text variant="title" variantStyle="h5" style={commonStyle.marginBottom10}>
                    Monitora quanto hai già utilizzato. La barra di avanzamento ti mostra in tempo
                    reale quanto hai speso rispetto al limite impostato.
                </Text>
            )}

            {budget ? (
                <View>
                    <Text variant="title" variantStyle="h1" style={{ color: colors.greenHaz }}>
                        {budget.category}
                    </Text>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text variant="title" variantStyle="h1" style={{ marginRight: 10 }}>
                            {budget.name}
                        </Text>
                        <Text variant="title" variantStyle="h1" style={{ color: colors.greenHaz }}>
                            {budget.amount} €{' '}
                        </Text>
                    </View>

                    <LinearProgressBar
                        style={commonStyle.marginBottom10}
                        emptyPartColor={colors.madang}
                        progressColor={
                            currentValue > budget.amount ? colors.redder : colors.greenHaz
                        }
                        maxValue={100}
                        currentValue={percentage}
                    />

                    <Text variant="title" variantStyle="h1" style={{ color: colors.greenHaz }}>
                        {percentage} %
                    </Text>
                </View>
            ) : (
                <BadgetEmptyContainer />
            )}
        </SafeAreaView>
    );
};

/**
 * Styles
 *
 */
const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
});

export default BudgetScreen;
