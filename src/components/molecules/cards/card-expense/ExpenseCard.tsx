import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import colors from '@common/colors';
import Text from '@components/atoms/text';
import ExpenseIcon from '@components/molecules/cards/card-expense/ExpenseIcon';
import { Wallet, WalletExpense } from '@model/wallet';
import { getFullDateFromISO } from '@utils/date.utils';

type ExpenseCardProps = {
    wallet: Wallet;
    expense: WalletExpense;
    onPress: () => void;
};

/**
 *
 *
 */
const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, wallet, onPress }) => {
    const amount = expense.type === 'EXPENSE' ? `-${expense.amount}` : `${expense.amount}`;
    const currency = wallet.currency === 'EU' ? '€' : wallet.currency;
    const date = getFullDateFromISO(expense.date);

    /**
     *
     */
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                { backgroundColor: pressed ? '#f1f1f1' : colors.solidWhite },
            ]}>
            <View style={styles.iconWrapper}>
                <ExpenseIcon name={expense.category} />
            </View>

            <View style={styles.textContainer}>
                <Text variant="title" variantStyle={'little'} style={styles.title}>
                    {expense.category}
                </Text>
                <Text variant="title" variantStyle={'little'} style={styles.subtitle}>
                    {date}
                </Text>
            </View>
            <Text
                variant="label"
                variantStyle={'data'}
                style={expense.type === 'EXPENSE' ? styles.priceExpense : styles.priceIncoming}>
                {amount}
            </Text>
            <Text
                variant="label"
                variantStyle={'data'}
                style={[
                    styles.currency,
                    expense.type === 'EXPENSE' ? styles.priceExpense : styles.priceIncoming,
                ]}>
                {currency}
            </Text>
        </Pressable>
    );
};

/**
 *
 */
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconWrapper: {
        height: 40,
        width: 40,
        backgroundColor: colors.darkGray,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        marginLeft: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E2F38',
    },
    subtitle: {
        fontSize: 14,
        color: '#4E505F',
    },
    priceExpense: {
        paddingRight: 4,
        color: colors.red,
    },
    priceIncoming: {
        paddingRight: 4,
        color: colors.emerald2,
    },
    currency: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E2F38',
    },
});

export default ExpenseCard;
