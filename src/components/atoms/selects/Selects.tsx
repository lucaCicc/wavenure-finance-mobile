import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '@common/colors';
import Text from '@components/atoms/text';
import ExpenseIcon from '@components/molecules/cards/card-expense/ExpenseIcon';

interface Prosp<T> {
    setChoice: (value: T) => void;
    choice: string;
    values: T[];
    horizontal: boolean;
    showIcon?: boolean;
}

const Options = <T extends string>({
    setChoice,
    choice,
    values,
    horizontal = true,
    showIcon,
}: Prosp<T>) => (
    <View>
        <View style={{ flexDirection: horizontal ? 'row' : 'column' }}>
            {values.map((value, index) => (
                <View key={index} style={{ flexDirection: 'row', marginBottom: 10 }}>
                    <TouchableOpacity
                        style={[styles.radioButton, choice === value && styles.selectedRadio]}
                        onPress={() => setChoice(value)}>
                        <View
                            style={[styles.radioCircle, choice === value && styles.selectedCircle]}
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        {showIcon ? (
                            <View style={{ marginRight: 10 }}>
                                <ExpenseIcon name={value as any} />
                            </View>
                        ) : null}
                        <View>
                            <Text variant="text" variantStyle={'introduction'}>
                                {value}
                            </Text>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.emerald2,
        marginRight: 10,
    },
    selectedCircle: {
        backgroundColor: colors.emerald2,
    },
    selectedRadio: {
        opacity: 0.7,
    },
});

export default Options;
