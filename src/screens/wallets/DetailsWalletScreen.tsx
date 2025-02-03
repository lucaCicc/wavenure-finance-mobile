import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WalletExpenseContainer from '@/container/wallet-expense-container/WalletExpenseContainer';
import { useGetExpenseQuery } from '@api/queries/expense/useGetEspenseQuery';
import colors from '@common/colors';
import ButtonCircle from '@components/molecules/buttons/button-circle/CircleButton';
import DefaultHeader from '@components/organisms/headers/header-default/DefaultHeader';
import { MainStack } from '@navigation/types/index.types';
import { DetailsWalletNavProps, SharedScreen } from '@navigation/types/shared.types';

type NavProps = object & DetailsWalletNavProps;

/**
 * Create Wallet Screen
 *
 */
const DetailsWalletScreen: React.FC<NavProps> = ({ navigation, route }) => {
    const wallet = route.params.wallet;

    const { data } = useGetExpenseQuery(wallet.id, {
        enabled: !!wallet.id,
    });

    const expenses = data?.data;

    const navigateToExpense = useCallback(() => {
        navigation.navigate(MainStack.SHARED, {
            screen: SharedScreen.CREATE_EXPENSE,
            params: {
                wallet,
            },
        });
    }, [navigation, wallet]);

    /*
     * Main Render
     *
     */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultHeader
                title="Transazioni"
                onPress={navigation.goBack}
                iconButton={<Feather name="x-circle" size={24} color={colors.solidWhite} />}
            />
            <WalletExpenseContainer wallet={wallet} expenses={expenses} />;
            <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
                <ButtonCircle
                    size={50}
                    onPress={navigateToExpense}
                    icon={<AntDesign name="plus" size={24} color={colors.solidWhite} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default DetailsWalletScreen;
