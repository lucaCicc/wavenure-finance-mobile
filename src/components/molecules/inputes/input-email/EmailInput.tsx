import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface Props {
    placeholder: string;
    onChange?: (text: string) => void;
}

const EmailInput: React.FC<Props> = ({ placeholder = 'Email', onChange, ...props }) => (
    <View style={styles.container}>
        <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={onChange}
            placeholder={placeholder}
            {...props}
        />
        <Entypo name="email" size={24} color="black" />
    </View>
);

/**
 *
 */
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4E505F',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        height: 40,
        color: '#2E2F38',
    },
});

export default EmailInput;
