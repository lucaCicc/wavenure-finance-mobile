import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGetExpenseQuery } from '@api/queries/expense/useGetEspenseQuery';
import colors from '@common/colors';
import Text from '@components/atoms/text';
import ButtonCircle from '@components/molecules/buttons/button-circle/CircleButton';
import ExpenseCard from '@components/molecules/cards/card-expense/ExpenseCard';
import DefaultHeader from '@components/organisms/headers/header-default/DefaultHeader';
import { WalletExpense } from '@model/wallet';
import { MainStack } from '@navigation/types/index.types';
import { DetailsWalletNavProps, SharedScreen } from '@navigation/types/shared.types';

type NavProps = object & DetailsWalletNavProps;

/**
 * Create Wallet Screen
 *
 */
const DetailsWalletScreen: React.FC<NavProps> = ({ navigation, route }) => {
    const wallet = route.params.wallet;

    const { data } = useGetExpenseQuery(wallet.id);

    const walletDifference = wallet.currentBalance - wallet.initialBalance;
    const expenses = data?.data;

    const _renderItem = useCallback(
        ({ item }: ListRenderItemInfo<WalletExpense>): React.ReactElement | null => (
            <ExpenseCard wallet={wallet} expense={item} onPress={() => null} />
        ),
        [wallet]
    );

    const navigateToCreteWallet = useCallback(() => {
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

            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text variant="display" variantStyle="medium-bold">
                        {wallet.currentBalance} €
                    </Text>
                    <Text variant="label" variantStyle="chipsStatus">
                        Bilancio Portafoglio
                    </Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                        variant="display"
                        variantStyle="medium-bold"
                        style={{
                            color: walletDifference > 0 ? colors.emerald2 : colors.red,
                        }}>
                        {walletDifference} €
                    </Text>
                    <Text variant="label" variantStyle="chipsStatus">
                        Flusso di cassa
                    </Text>
                </View>
            </View>

            <View style={{ paddingHorizontal: 16 }}>
                <FlatList
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    data={expenses}
                    renderItem={_renderItem}
                    scrollEnabled={false}
                />
            </View>

            <View style={{ position: 'absolute', bottom: 16, right: 16 }}>
                <ButtonCircle
                    size={50}
                    onPress={navigateToCreteWallet}
                    icon={<AntDesign name="plus" size={24} color={colors.solidWhite} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default DetailsWalletScreen;
