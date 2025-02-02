import { SimpleLineIcons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';

import colors from '@common/colors';
import Text from '@components/atoms/text';

export type DefaultCardProps = {
    icon?: ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
};

const DefaultCard: React.FC<DefaultCardProps> = ({ title, subtitle, icon, onPress }) => (
    <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            styles.card,
            { backgroundColor: pressed ? '#f1f1f1' : colors.solidWhite },
        ]}>
        {icon && <View style={{ marginRight: 10 }}>{icon}</View>}
        <View style={styles.textContainer}>
            <Text variant="text" variantStyle={'paragraph-large-bold'} style={styles.title}>
                {title}
            </Text>
            {subtitle && (
                <Text variant="text" variantStyle={'paragraph-large-bold'} style={styles.subtitle}>
                    {subtitle}
                </Text>
            )}
        </View>
        <SimpleLineIcons name="arrow-right" size={24} color="black" />
    </Pressable>
);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E2F38',
    },
    subtitle: {
        fontSize: 14,
        color: '#4E505F',
    },
});

export default DefaultCard;
