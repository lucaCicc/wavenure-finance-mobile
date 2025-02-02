/* eslint-disable react-native/no-color-literals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import colors from '@common/colors';
import CustomHeader from '@components/organisms/calendar/CalendarHeader';
import { SCREEN_WIDTH } from '@utils/system.utils';

const INITIAL_DATE = new Date().toISOString().split('T')[0];

export interface CalendarViewRef {
    getSelectedDate(): string;
}

/**
 *
 *
 */
const CalendarView = React.forwardRef<CalendarViewRef, any>((_, ref) => {
    const [currentDate, setCurrentDate] = useState(INITIAL_DATE);
    const [selectedDate, setSelectedDate] = useState<string>(INITIAL_DATE);

    const handleDayPress = (day: any) => {
        setSelectedDate(day.dateString);
    };

    useImperativeHandle(
        ref,
        () => ({
            getSelectedDate() {
                return selectedDate;
            },
        }),
        [selectedDate]
    );

    /**
     * Render Main
     *
     */
    return (
        <View style={styles.container}>
            <Calendar
                initialDate={currentDate}
                onDayPress={handleDayPress}
                markingType={'custom'}
                markedDates={{
                    [selectedDate]: {
                        customStyles: {
                            container: {
                                backgroundColor: colors.blue,
                                elevation: 2,
                                height: 30,
                                width: 30,
                                borderRadius: 8,
                            },
                            text: {
                                color: 'white',
                                marginTop: 0,
                                alignItems: 'center',
                                top: 5,
                            },
                        },
                    },
                }}
                customHeader={(props: any) => (
                    <CustomHeader
                        {...props}
                        setCurrentDate={setCurrentDate}
                        currentDate={currentDate}
                    />
                )}
            />
        </View>
    );
});

export default CalendarView;

/**
 * Styles
 *
 */
const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH - 32,
        height: 380,
    },
});
