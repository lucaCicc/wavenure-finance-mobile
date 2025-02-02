import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import colors from '@common/colors';

type ButtonCircleProps = {
    icon?: ReactNode;
    onPress: () => void;
    size?: number;
};

const ButtonCircle: React.FC<ButtonCircleProps> = ({ onPress, size = 40, icon }) => (
    <Pressable style={[styles.button, { width: size, height: size }]} onPress={onPress}>
        {icon && <View>{icon}</View>}
    </Pressable>
);

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: colors.emerald2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ButtonCircle;
