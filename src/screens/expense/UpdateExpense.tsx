import {
    AntDesign,
    Feather,
    FontAwesome,
    FontAwesome6,
    Fontisto,
    MaterialIcons,
} from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import useDeleteExpenseQuery from '@api/queries/expense/useDeleteExpenseQuery';
import { GET_EXPENSE_WALLET_QUERY_KEY } from '@api/queries/expense/useGetEspenseQuery';
import useUpdateExpenseQuery from '@api/queries/expense/useUpdateExpenseQuery';
import queryClient from '@api/queryClient';
import colors from '@common/colors';
import Options from '@components/atoms/selects/Selects';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import DefaultInput from '@components/molecules/inputes/input-default/DefaultInput';
import DefaultHeader from '@components/organisms/headers/header-default/DefaultHeader';
import CalenderTemplate from '@components/templates/drawer/CalenderTemplate';
import TransactionCategoryTemplate from '@components/templates/drawer/TransactionCategoryTemplate';
import { HttpError } from '@model/error';
import { ExpenseCategory, ExpenseType } from '@model/wallet';
import { UpdateExpensetNavProps } from '@navigation/types/shared.types';
import { useBottomSheet } from '@providers/bottom-sheet';
import { BOTTOM_SHEET_ID } from '@providers/bottom-sheet/type';

type NavProps = object & UpdateExpensetNavProps;

const types: ExpenseType[] = ['EXPENSE', 'INCOME'];

/**
 *
 *
 */
const UpdateExpense: React.FC<NavProps> = ({ navigation, route }) => {
    const expense = route.params.expense;
    const bottomSheet = useBottomSheet();
    const { updateExpense, isUpdateExpenseLoading } = useUpdateExpenseQuery();
    const { deleteExpense, isDeleteExpense } = useDeleteExpenseQuery();

    const [date, setDate] = useState<string>(expense.date.split('T')[0]);
    const [note, setNote] = useState<string>(expense.note);
    const [amount, setAmount] = useState<string>(expense.amount.toString());
    const [type, setType] = useState<ExpenseType>(expense.type);
    const [category, setCategory] = useState<ExpenseCategory>(expense.category);

    const cleanInput = useCallback(() => {
        setDate('');
        setNote('');
        setAmount('');
        setType('EXPENSE');
        setCategory('OTHER');
    }, []);

    const updateExpenseHendler = useCallback(() => {
        // TO DO: sanitize payload
        const payload = {
            amount: Number(amount),
            category,
            date: new Date(date).toISOString(),
            note,
            type,
            walletId: expense.walletId,
            id: expense.id,
        };

        updateExpense(payload, {
            onSuccess: () => {
                queryClient.fetchQuery(GET_EXPENSE_WALLET_QUERY_KEY(expense.walletId));

                Toast.show({
                    autoHide: true,
                    type: 'success',
                    text1: 'Aggiornameto avvenuto con successo',
                    position: 'top',
                    visibilityTime: 400,
                    topOffset: 60,
                    onHide: () => navigation.goBack(),
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
    }, [
        amount,
        category,
        date,
        note,
        type,
        expense.walletId,
        expense.id,
        updateExpense,
        navigation,
    ]);

    /**
     *
     */
    const deleteExpenseHendler = useCallback(() => {
        deleteExpense(
            {
                id: expense.id,
                walletId: expense.walletId,
            },
            {
                onSuccess: () => {
                    queryClient.fetchQuery(GET_EXPENSE_WALLET_QUERY_KEY(expense.walletId));

                    Toast.show({
                        autoHide: true,
                        type: 'success',
                        text1: 'Transazione rimossa!',
                        position: 'top',
                        topOffset: 300,
                        visibilityTime: 400,
                        onHide: () => navigation.goBack(),
                    });
                },
                onError: (_: HttpError) => {
                    Toast.show({
                        autoHide: true,
                        type: 'error',
                        text1: 'Non possiamo eliminare la Transazione',
                    });
                },
            }
        );
    }, [deleteExpense, expense.id, expense.walletId, navigation]);

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
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultHeader
                title="Aggiorna Transazione"
                onPress={navigation.goBack}
                iconButton={<Feather name="x-circle" size={24} color={colors.solidWhite} />}
            />

            <View style={{ flex: 1 }}>
                <View style={{ marginBottom: 10, paddingHorizontal: 16 }}>
                    <DefaultInput
                        onChangeText={() => null}
                        placeholder="Portafoglio"
                        value={'Portafoglio'}
                        icon={<AntDesign name="wallet" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={{ marginBottom: 10, paddingHorizontal: 16 }}>
                    <DefaultInput
                        placeholder="Importo"
                        onChangeText={setAmount}
                        value={amount}
                        keyboardType="numeric"
                        icon={<FontAwesome6 name="sack-dollar" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={{ marginBottom: 10, paddingHorizontal: 16 }}>
                    <DefaultInput
                        editable={false}
                        pointerEvents="none"
                        onPress={openCalendarDrawer}
                        placeholder="Data"
                        value={date}
                        icon={<Fontisto name="date" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={{ marginBottom: 10, paddingHorizontal: 16 }}>
                    <DefaultInput
                        placeholder="nota"
                        onChangeText={setNote}
                        value={note}
                        icon={<FontAwesome name="sticky-note" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={{ marginBottom: 10, paddingHorizontal: 16 }}>
                    <DefaultInput
                        editable={false}
                        pointerEvents="none"
                        onPress={openCategoryDrawer}
                        placeholder="Categoria di Treansazione"
                        value={category}
                        icon={<MaterialIcons name="category" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
                    <Options choice={type} setChoice={setType} values={types} horizontal />
                </View>
            </View>

            <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
                <ConfirmButton
                    onPress={deleteExpenseHendler}
                    style={{ backgroundColor: colors.milanoRed2 }}
                    title="Elimina"
                    isLoading={isDeleteExpense}
                    disable={!date || !amount || !category || !type}
                />
            </View>
            <View style={{ paddingHorizontal: 16 }}>
                <ConfirmButton
                    onPress={updateExpenseHendler}
                    title="Aggiorna"
                    isLoading={isUpdateExpenseLoading}
                    disable={!date || !amount || !category || !type}
                />
            </View>
            <Toast />
        </SafeAreaView>
    );
};

export default UpdateExpense;
