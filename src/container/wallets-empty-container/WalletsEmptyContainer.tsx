import { StyleSheet, View } from 'react-native';

import colors from '@common/colors';
import Text from '@components/atoms/text';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';

/**
 *
 *
 */
const WalletsEmptyContainer = () => (
    <View style={styles.container}>
        <View style={styles.wrapper}>
            <Text variant="title" variantStyle="h3" style={styles.title}>
                Il tuo portafoglio è vuoti
            </Text>
            <Text variant="text" variantStyle="introduction" style={styles.subTitle}>
                Collega il tuo conto bancario o inizia a monitorare manualmente le tue spese
            </Text>
        </View>

        <View style={styles.ctaWrapper}>
            <ConfirmButton onPress={() => null} title="Collega un conto bancario" disable={true} />
        </View>
        <View>
            <ConfirmButton onPress={() => null} title="Crea un portafoglio in contanti" />
        </View>
    </View>
);

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
    ctaWrapper: {
        marginBottom: 8,
    },
});

export default WalletsEmptyContainer;
