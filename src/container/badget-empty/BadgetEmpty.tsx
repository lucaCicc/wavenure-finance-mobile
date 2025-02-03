import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '@common/colors';
import Text from '@components/atoms/text';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import { MainStack } from '@navigation/types/index.types';
import { CreateBudgetNavProps, SharedScreen } from '@navigation/types/shared.types';

/**
 *
 *
 */
const BadgetEmptyContainer: React.FC = () => {
    const navigation = useNavigation();

    const navigateToCreteBudget = useCallback(() => {
        const _navigation = navigation as unknown as CreateBudgetNavProps['navigation'];
        _navigation.navigate(MainStack.SHARED, {
            screen: SharedScreen.CREATE_BUDGET,
        });
    }, [navigation]);

    /**
     *
     */
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text variant="title" variantStyle="h3" style={styles.title}>
                    Non hai budget
                </Text>
                <Text variant="text" variantStyle="introduction" style={styles.subTitle}>
                    Comincia a risparmiare creando dei budget e ti aiuteremo a mantenerli
                </Text>
            </View>
            <ConfirmButton onPress={navigateToCreteBudget} title="Crea il tuo primo budget" />
        </View>
    );
};

/**
 *
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    wrapper: {
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 5,
    },
    subTitle: {
        textAlign: 'center',
        marginBottom: 16,
        color: colors.doveGray,
    },
});

export default BadgetEmptyContainer;
