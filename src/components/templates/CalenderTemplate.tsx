import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { commonStyle } from '@common/styles';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import type { CalendarViewRef } from '@components/organisms/calendar/Calendar';
import CalendarView from '@components/organisms/calendar/Calendar';

interface Props {
    onConfirm: (date: string) => void;
    onExit: () => void;
}

/**
 *
 *
 */
const CalenderTemplate: React.FC<Props> = ({ onConfirm, onExit }) => {
    const listSelectionRef = useRef<CalendarViewRef>(null);

    return (
        <View style={styles.container}>
            <CalendarView ref={listSelectionRef} />

            <View style={styles.wrapperBtn}>
                <View style={commonStyle.flex}>
                    <ConfirmButton
                        onPress={() => {
                            const selectedDate = listSelectionRef.current?.getSelectedDate();
                            selectedDate && onConfirm(selectedDate);
                        }}
                        title="Conferma"
                    />
                </View>
                <View style={commonStyle.flex}>
                    <ConfirmButton onPress={onExit} title="   Annulla" />
                </View>
            </View>
        </View>
    );
};

/**
 * Styles
 *
 */
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 16,
        marginTop: 12,
    },
    wrapperBtn: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 16,
        columnGap: 8,
    },
});

export default CalenderTemplate;
