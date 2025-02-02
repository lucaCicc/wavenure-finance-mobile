import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGetWalletsQuery } from '@api/queries/wallet/useGetWalletsQuery';
import colors from '@common/colors';
import Text from '@components/atoms/text';
import DefaultCard from '@components/molecules/cards/card-default/DefaultCard';
import { Wallet } from '@model/wallet';
import { MainStack } from '@navigation/types/index.types';
import { DetailsWalletNavProps, SharedScreen } from '@navigation/types/shared.types';

/**
 *
 *
 */
const WalletsScreen = () => {
    console.log('kkk');

    const { data } = useGetWalletsQuery();
    const navigation = useNavigation();

    const wallets = data?.data.wallets;

    const handlePress = useCallback(
        (wallet: Wallet) => {
            const _navigation = navigation as unknown as DetailsWalletNavProps['navigation'];

            _navigation.navigate(MainStack.SHARED, {
                screen: SharedScreen.DETAILS_WALLET,
                params: {
                    wallet,
                },
            });
        },
        [navigation]
    );

    const _renderItem = useCallback(
        ({ item }: ListRenderItemInfo<Wallet>): React.ReactElement | null => (
            <DefaultCard
                key={item.id}
                title={item.name}
                onPress={() => handlePress(item)}
                icon={<FontAwesome5 name="wallet" size={24} color={colors.indochine} />}
            />
        ),
        [handlePress]
    );

    /**
     * Main render
     *
     */
    return (
        <SafeAreaView style={{ marginHorizontal: 16, marginTop: 16 }}>
            <Text variant="title" variantStyle="h2" style={{ marginBottom: 10 }}>
                I tuoi portafogli
            </Text>
            <FlatList
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={wallets}
                renderItem={_renderItem}
                scrollEnabled={false}
            />
        </SafeAreaView>
    );
};

export default WalletsScreen;
