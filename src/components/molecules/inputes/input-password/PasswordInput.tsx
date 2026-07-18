import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, StyleSheet } from 'react-native';

export interface Props {
    placeholder: string;
    onChange?: (text: string) => void;
}

/**
 *
 *
 */
const PasswordInput: React.FC<Props> = ({ placeholder = 'Password', onChange, ...props }) => {
    const [secureText, setSecureText] = useState(true);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChange}
                secureTextEntry={secureText}
                placeholder={placeholder}
                {...props}
            />
            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                {secureText ? (
                    <Feather name="eye-off" size={24} color="black" />
                ) : (
                    <AntDesign name="eye" size={24} color="black" />
                )}
            </TouchableOpacity>
        </View>
    );
};

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

export default PasswordInput;
