import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import EspenseFilter from '@/container/espanse-filter/EspenseFilter';
import { ExpenseFilter } from '@api/queries/expense/useGetEspenseQuery';
import colors from '@common/colors';
import { commonStyle } from '@common/styles';
import Text from '@components/atoms/text';
import ExpenseCard from '@components/molecules/cards/card-expense/ExpenseCard';
import { Wallet, WalletExpense } from '@model/wallet';
import { MainStack } from '@navigation/types/index.types';
import { UpdateExpensetNavProps, SharedScreen } from '@navigation/types/shared.types';

interface Props {
    wallet: Wallet;
    expenses?: WalletExpense[];
    applyFilter?: (filter?: ExpenseFilter) => void;
}

/**
 *
 */
const WalletExpenseContainer: React.FC<Props> = ({ wallet, expenses, applyFilter }) => {
    const navigation = useNavigation();

    const walletDifference = wallet.currentBalance - wallet.initialBalance;

    /**
     *
     */
    const navigateToUpdateExpense = useCallback(
        (expense: WalletExpense) => {
            const _navigation = navigation as unknown as UpdateExpensetNavProps['navigation'];

            _navigation.navigate(MainStack.SHARED, {
                screen: SharedScreen.UDPATE_EXPENSE,
                params: {
                    expense,
                },
            });
        },
        [navigation]
    );

    /**
     *
     */
    const _renderItem = useCallback(
        ({ item }: ListRenderItemInfo<WalletExpense>): React.ReactElement | null => (
            <ExpenseCard
                wallet={wallet}
                expense={item}
                onPress={() => navigateToUpdateExpense(item)}
            />
        ),
        [navigateToUpdateExpense, wallet]
    );

    /*
     * Main Render
     *
     */
    return (
        <View style={commonStyle.flex}>
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.innerWrapper}>
                        <Text variant="display" variantStyle="medium-bold">
                            {wallet.currentBalance} €
                        </Text>
                        <Text variant="label" variantStyle="chipsStatus">
                            Bilancio Portafoglio
                        </Text>
                    </View>

                    <View style={styles.box}>
                        <Text
                            variant="display"
                            variantStyle="medium-bold"
                            style={{
                                color: walletDifference >= 0 ? colors.emerald2 : colors.red,
                            }}>
                            {walletDifference} €
                        </Text>
                        <Text variant="label" variantStyle="chipsStatus">
                            Flusso di cassa
                        </Text>
                    </View>
                </View>

                {applyFilter ? <EspenseFilter onApplayFilter={applyFilter} /> : null}

                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={expenses}
                    renderItem={_renderItem}
                />
            </View>
        </View>
    );
};

/**
 *
 */
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    wrapper: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    innerWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    box: {
        flex: 1,
        alignItems: 'center',
    },
});

export default WalletExpenseContainer;
