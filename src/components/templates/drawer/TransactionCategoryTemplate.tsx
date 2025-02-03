import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Options from '@components/atoms/selects/Selects';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import { ExpenseCategory } from '@model/wallet';

interface Props {
    onConfirm: (category: ExpenseCategory) => void;
}

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
    'WORK',
    'FAMILY',
    'GIFT',
    'SHOPPING',
    'HOME',
    'CAR',
    'FOOD',
    'TRAVEL',
    'TRANSPORT',
    'OTHER',
    'SALARY',
    'LOAN',
    'EXTRA_INCOME',
];

/**
 *
 *
 */
const TransactionCategoryTemplate: React.FC<Props> = ({ onConfirm }) => {
    const [category, setCategory] = useState<ExpenseCategory>('OTHER');

    return (
        <View style={{ marginHorizontal: 16 }}>
            <Options
                choice={category}
                setChoice={setCategory}
                values={EXPENSE_CATEGORIES}
                horizontal={false}
                showIcon
            />
            <View style={{ marginTop: 24 }}>
                <ConfirmButton onPress={() => onConfirm(category)} title="Conferma" />
            </View>
        </View>
    );
};

/**
 * Styles
 *
 */
const styles = StyleSheet.create({});

export default TransactionCategoryTemplate;
