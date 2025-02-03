import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';

import colors from '@common/colors';
import Text from '@components/atoms/text';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import { Wallet } from '@model/wallet';
import { MainStack } from '@navigation/types/index.types';
import { CreateExpensetNavProps, SharedScreen } from '@navigation/types/shared.types';

interface Props {
    wallet: Wallet;
}

/**
 *
 *
 */
const EspenseEmptyContainer: React.FC<Props> = ({ wallet }) => {
    const navigation = useNavigation();

    const navigateToCreteExpense = useCallback(() => {
        const _navigation = navigation as unknown as CreateExpensetNavProps['navigation'];

        _navigation.navigate(MainStack.SHARED, {
            screen: SharedScreen.CREATE_EXPENSE,
            params: {
                wallet,
            },
        });
    }, [navigation, wallet]);

    /**
     *
     */
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View
                style={{
                    alignItems: 'center',
                }}>
                <Text
                    variant="title"
                    variantStyle="h3"
                    style={{
                        textAlign: 'center',
                        marginBottom: 5,
                    }}>
                    Non hai Spese!
                </Text>
                <Text
                    variant="text"
                    variantStyle="introduction"
                    style={{
                        textAlign: 'center',
                        marginBottom: 16,
                        color: colors.doveGray,
                    }}>
                    Inizia a monitorare manualmente le tue spese
                </Text>
            </View>
            <ConfirmButton onPress={navigateToCreteExpense} title="Aggiungi una Spesa" />
        </View>
    );
};

export default EspenseEmptyContainer;
