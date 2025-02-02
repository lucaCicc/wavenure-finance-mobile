import { Entypo, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useCreateWalletQuery from '@api/queries/wallet/useCreateWalletQuery';
import { GET_WALLETS_QUERY_KEY } from '@api/queries/wallet/useGetWalletsQuery';
import queryClient from '@api/queryClient';
import colors from '@common/colors';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import DefaultInput from '@components/molecules/inputes/input-default/DefaultInput';
import DefaultHeader from '@components/organisms/headers/header-default/DefaultHeader';
import { HttpError } from '@model/error';

/**
 * Create Wallet Screen
 *
 */
const CreateWalletScreen = () => {
    const { isQueryLoading, creteWallet } = useCreateWalletQuery();

    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const navigation = useNavigation();

    const handleCreteWallet = useCallback(() => {
        creteWallet(
            { currency: 'EU', initialBalance: +balance, name: name },
            {
                onSuccess: () => {
                    queryClient.fetchQuery(GET_WALLETS_QUERY_KEY);

                    navigation.goBack();
                },
                onError: (httpError: HttpError) => {
                    // TO DO: hanlde error
                    console.log('httpError', httpError);
                },
            }
        );
    }, [balance, creteWallet, name, navigation]);

    /*
     * Main Render
     *
     */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultHeader
                title="Crea un Nuovo Protafoglio"
                onPress={navigation.goBack}
                iconButton={<Feather name="x-circle" size={24} color={colors.solidWhite} />}
            />

            <View style={{ marginHorizontal: 24, flex: 1 }}>
                <View style={{ marginBottom: 10 }}>
                    <DefaultInput
                        onChangeText={setName}
                        placeholder="Name"
                        value={name}
                        icon={<Entypo name="wallet" size={24} color={colors.emerald2} />}
                    />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <DefaultInput
                        value={balance}
                        onChangeText={setBalance}
                        placeholder="Saldo iniziale"
                        icon={<Ionicons name="cash-outline" size={24} color={colors.emerald2} />}
                    />
                </View>
                <DefaultInput
                    editable={false}
                    value={'EU'}
                    icon={
                        <MaterialCommunityIcons
                            name="currency-eur"
                            size={24}
                            color={colors.emerald2}
                        />
                    }
                />
            </View>

            <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
                <ConfirmButton
                    isLoading={isQueryLoading}
                    disable={!name || !balance}
                    onPress={handleCreteWallet}
                    title="Crea un Nuovo Portafoglio"
                />
            </View>
        </SafeAreaView>
    );
};

export default CreateWalletScreen;
