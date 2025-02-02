import { Entypo, Feather } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '@common/colors';
import DefaultInput from '@components/molecules/inputes/input-default/DefaultInput';
import DefaultHeader from '@components/organisms/headers/header-default/DefaultHeader';
import CalenderTemplate from '@components/templates/CalenderTemplate';
import { CreateExpensetNavProps } from '@navigation/types/shared.types';
import { useBottomSheet } from '@providers/bottom-sheet';
import { BOTTOM_SHEET_ID } from '@providers/bottom-sheet/type';

type NavProps = object & CreateExpensetNavProps;

/**
 *
 *
 */
const CreateExpense: React.FC<NavProps> = ({ navigation }) => {
    const bottomSheet = useBottomSheet();
    const [date, setDate] = useState('');

    console.log('date', date);

    const openCalendarDrawer = useCallback(() => {
        bottomSheet.open({
            id: BOTTOM_SHEET_ID.TEST,
            title: 'Data',
            content: (
                <CalenderTemplate
                    onConfirm={(selectedDate) => {
                        setDate(selectedDate);
                        bottomSheet.close();
                    }}
                    onExit={() => {
                        bottomSheet.close();
                    }}
                />
            ),
        });
    }, [bottomSheet]);

    /**
     *
     */
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <DefaultHeader
                title="Aggiungi Transazione"
                onPress={navigation.goBack}
                iconButton={<Feather name="x-circle" size={24} color={colors.solidWhite} />}
            />

            <View style={{ marginBottom: 10, paddingHorizontal: 16 }}>
                <DefaultInput
                    onChangeText={() => null}
                    placeholder="Portafoglio"
                    value={''}
                    icon={<Entypo name="wallet" size={24} color={colors.emerald2} />}
                />
            </View>
            <View style={{ marginBottom: 10, paddingHorizontal: 16 }}>
                <DefaultInput
                    editable={false}
                    pointerEvents="none"
                    onPress={openCalendarDrawer}
                    placeholder="Data"
                    value={date}
                    icon={<Entypo name="wallet" size={24} color={colors.emerald2} />}
                />
            </View>
        </SafeAreaView>
    );
};

export default CreateExpense;
