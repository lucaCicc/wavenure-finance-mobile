import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '@components/atoms/text';
import ButtonCircle from '@components/molecules/buttons/button-circle/CircleButton';

type DefaultHeaderProps = {
    iconButton?: ReactNode;
    title: string;
    onPress: () => void;
};

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ title, onPress, iconButton }) => (
    <View style={styles.header}>
        <ButtonCircle onPress={onPress} icon={iconButton} />
        <Text variant="title" variantStyle={'h2'} style={styles.title}>
            {title}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 16,
        height: 60,
    },
    title: {
        marginLeft: 15,
    },
});

export default DefaultHeader;
