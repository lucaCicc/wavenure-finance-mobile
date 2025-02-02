import React, { ReactNode } from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    TouchableOpacity,
} from 'react-native';

import colors from '@common/colors';

type DefaultInputProps = TextInputProps & {
    icon?: ReactNode;
    style?: ViewStyle;
    editable?: boolean;
    onChangeText?: (text: string) => void;
    onPress?: () => void;
    value: string;
};

const DefaultInput: React.FC<DefaultInputProps> = ({
    icon,
    placeholder = 'Enter text',
    style,
    value,
    onChangeText,
    onPress,
    editable = true,
    ...props
}) => (
    <TouchableOpacity style={[styles.container, style]} disabled={editable} onPress={onPress}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
            onChangeText={onChangeText}
            editable={editable}
            value={value}
            pointerEvents="none"
            style={styles.input}
            placeholder={placeholder}
            {...props}
        />
    </TouchableOpacity>
);

/**
 *
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.doveGray,
        paddingVertical: 10,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#2E2F38',
    },
});

export default DefaultInput;
