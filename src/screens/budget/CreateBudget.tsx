import { AntDesign, Feather, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import useCreateBudget from '@api/queries/budget/useCreateBudgetQuery';
import { GET_BUDGET_QUERY_KEY } from '@api/queries/budget/useGetBudgetListQuery';
import queryClient from '@api/queryClient';
import colors from '@common/colors';
import { commonStyle } from '@common/styles';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import DefaultInput from '@components/molecules/inputes/input-default/DefaultInput';
import DefaultHeader from '@components/organisms/headers/header-default/DefaultHeader';
import TransactionCategoryTemplate from '@components/templates/drawer/TransactionCategoryTemplate';
import { HttpError } from '@model/error';
import { ExpenseCategory } from '@model/wallet';
import { CreateBudgetNavProps } from '@navigation/types/shared.types';
import { useBottomSheet } from '@providers/bottom-sheet';
import { BOTTOM_SHEET_ID } from '@providers/bottom-sheet/type';

type NavProps = object & CreateBudgetNavProps;

const CreateBudget: React.FC<NavProps> = ({ navigation }) => {
    const { creteBudget, isQueryLoading } = useCreateBudget();

    const bottomSheet = useBottomSheet();

    const [amount, setAmount] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<ExpenseCategory>();

    console.log(category, name, amount);

    const createBudgetHandler = useCallback(() => {
        if (amount && name && category) {
            const payload = {
                amount: Number(amount),
                currency: 'EU',
                category,
                name,
            };

            creteBudget(payload, {
                onSuccess: () => {
                    queryClient.fetchQuery(GET_BUDGET_QUERY_KEY);

                    Toast.show({
                        autoHide: true,
                        type: 'success',
                        text1: 'Budget creato!',
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
                        text1: 'Non possiamo creare il Budget',
                    });
                },
            });
        }
    }, [amount, category, creteBudget, name, navigation]);

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
        <SafeAreaView style={styles.container}>
            <DefaultHeader
                title="Aggingi nuovo budget"
                onPress={navigation.goBack}
                iconButton={<Feather name="x-circle" size={24} color={colors.solidWhite} />}
            />

            <View style={commonStyle.flex}>
                <View style={styles.wrapperInput}>
                    <DefaultInput
                        onChangeText={setName}
                        placeholder="Nome Budget"
                        value={name}
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
                        onPress={openCategoryDrawer}
                        placeholder="Budget per"
                        value={category ?? ''}
                        icon={<MaterialIcons name="category" size={24} color={colors.emerald2} />}
                    />
                </View>
            </View>
            <View>
                <ConfirmButton
                    onPress={createBudgetHandler}
                    title="Comferma"
                    isLoading={isQueryLoading}
                    disable={!amount || !name || !category}
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
    container: {
        flex: 1,
        marginHorizontal: 16,
    },
    wrapperInput: {
        marginBottom: 10,
        paddingHorizontal: 16,
    },
});

export default CreateBudget;
