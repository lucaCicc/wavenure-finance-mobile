import {
    AntDesign,
    Feather,
    FontAwesome,
    FontAwesome6,
    Fontisto,
    MaterialIcons,
} from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import useCreateExpenseQuery from '@api/queries/expense/useCreateExpenseQuery';
import { GET_EXPENSE_WALLET_QUERY_KEY } from '@api/queries/expense/useGetEspenseQuery';
import queryClient from '@api/queryClient';
import colors from '@common/colors';
import { commonStyle } from '@common/styles';
import Options from '@components/atoms/selects/Selects';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import DefaultInput from '@components/molecules/inputes/input-default/DefaultInput';
import DefaultHeader from '@components/organisms/headers/header-default/DefaultHeader';
import CalenderTemplate from '@components/templates/drawer/CalenderTemplate';
import TransactionCategoryTemplate from '@components/templates/drawer/TransactionCategoryTemplate';
import { HttpError } from '@model/error';
import { ExpenseCategory, ExpenseType } from '@model/wallet';
import { CreateExpensetNavProps } from '@navigation/types/shared.types';
import { useBottomSheet } from '@providers/bottom-sheet';
import { BOTTOM_SHEET_ID } from '@providers/bottom-sheet/type';

type NavProps = object & CreateExpensetNavProps;

const types: ExpenseType[] = ['EXPENSE', 'INCOME'];

/**
 *
 *
 */
const CreateExpense: React.FC<NavProps> = ({ navigation, route }) => {
    const wallet = route.params.wallet;
    const bottomSheet = useBottomSheet();
    const { creteExpense, isQueryLoading } = useCreateExpenseQuery();

    const [date, setDate] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [type, setType] = useState<ExpenseType>('EXPENSE');
    const [category, setCategory] = useState<ExpenseCategory>('OTHER');

    const cleanInput = useCallback(() => {
        setDate('');
        setNote('');
        setAmount('');
        setType('EXPENSE');
        setCategory('OTHER');
    }, []);

    const createExpense = useCallback(() => {
        // TO DO: sanitize payload
        const payload = {
            amount: Number(amount),
            category,
            date: new Date(date).toISOString(),
            note,
            type,
            walletId: wallet.id,
        };

        creteExpense(payload, {
            onSuccess: () => {
                queryClient.fetchQuery(GET_EXPENSE_WALLET_QUERY_KEY(wallet.id));

                cleanInput();

                Toast.show({
                    autoHide: true,
                    type: 'success',
                    text1: 'Transazione create!',
                    position: 'top',
                    topOffset: 60,
                    text2: 'Aggiungi una nuova Transazione',
                });
            },
            onError: (_: HttpError) => {
                Toast.show({
                    autoHide: true,
                    type: 'error',
                    text1: 'Non possiamo aggiungere la Transazione',
                });
            },
        });
    }, [amount, category, cleanInput, creteExpense, date, note, type, wallet.id]);

    /**
     *
     */
    const openCalendarDrawer = useCallback(() => {
        bottomSheet.open({
            id: BOTTOM_SHEET_ID.TEST,
            title: 'Data',
            content: (
                <CalenderTemplate
                    onConfirm={(selectedDate) => {
                        setDate(selectedDate);
                        bottomSheet.close();
                    }}
                    onExit={() => {
                        bottomSheet.close();
                    }}
                />
            ),
        });
    }, [bottomSheet]);

    /**
     *
     */
    const openCategoryDrawer = useCallback(() => {
        bottomSheet.open({
            id: BOTTOM_SHEET_ID.TEST,
            title: 'Categoria di treansazione',
            content: (
                <TransactionCategoryTemplate
                    onConfirm={(category) => {
                        setCategory(category);
                        bottomSheet.close();
                    }}
                />
            ),
        });
    }, [bottomSheet]);

    /**
     * Main render
     *
     */
    return (
        <SafeAreaView style={commonStyle.flex}>
            <DefaultHeader
                title="Aggiungi Transazione"
                onPress={navigation.goBack}
                iconButton={<Feather name="x-circle" size={24} color={colors.solidWhite} />}
            />

            <View style={commonStyle.flex}>
                <View style={styles.wrapperInput}>
                    <DefaultInput
                        onChangeText={() => null}
                        placeholder="Portafoglio"
                        value={wallet.name}
                        icon={<AntDesign name="wallet" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={styles.wrapperInput}>
                    <DefaultInput
                        placeholder="Importo"
                        onChangeText={setAmount}
                        value={amount}
                        keyboardType="numeric"
                        icon={<FontAwesome6 name="sack-dollar" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={styles.wrapperInput}>
                    <DefaultInput
                        editable={false}
                        pointerEvents="none"
                        onPress={openCalendarDrawer}
                        placeholder="Data"
                        value={date}
                        icon={<Fontisto name="date" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={styles.wrapperInput}>
                    <DefaultInput
                        placeholder="nota"
                        onChangeText={setNote}
                        value={note}
                        icon={<FontAwesome name="sticky-note" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={styles.wrapperInput}>
                    <DefaultInput
                        editable={false}
                        pointerEvents="none"
                        onPress={openCategoryDrawer}
                        placeholder="Categoria di Treansazione"
                        value={category}
                        icon={<MaterialIcons name="category" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={styles.wrapperInput}>
                    <Options choice={type} setChoice={setType} values={types} horizontal />
                </View>
            </View>

            <View style={commonStyle.marginHorizontal16}>
                <ConfirmButton
                    onPress={createExpense}
                    title="Comferma"
                    isLoading={isQueryLoading}
                    disable={!date || !amount || !category || !type}
                />
            </View>
            <Toast />
        </SafeAreaView>
    );
};

/**
 * Styles
 *
 */
const styles = StyleSheet.create({
    wrapperInput: {
        marginBottom: 10,
        paddingHorizontal: 16,
    },
});

export default CreateExpense;
