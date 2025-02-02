import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
    onPress: () => void;
    title: string;
    isLoading?: boolean;
    disable?: boolean;
}

const ConfirmButton: React.FC<Props> = ({
    title = 'Confirm',
    isLoading,
    onPress,
    disable = false,
}) => (
    <Pressable
        disabled={disable}
        style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : {}]}
        onPress={onPress}>
        {isLoading ? (
            <ActivityIndicator size="small" color="#00ff00" />
        ) : (
            <Text style={styles.text}>{title}</Text>
        )}
    </Pressable>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 16,
        paddingHorizontal: 30,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: '#218838',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ConfirmButton;
