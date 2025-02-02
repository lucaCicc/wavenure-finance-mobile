/* eslint-disable react-native/no-color-literals */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AntDesign } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '@common/colors';
import Text from '@components/atoms/text/Text';
import ButtonCircle from '@components/molecules/buttons/button-circle/CircleButton';
import { dateFormatter, weekDays } from '@utils/date.utils';

/**
 *
 */
const CustomHeader = React.forwardRef((props: any, ref) => {
    const customHeaderProps: any = useRef();
    customHeaderProps.current = props;

    /**
     * Increment / Decrement Month
     *
     */
    const setNewMonth = ({ next }: { next: boolean }) => {
        const add = next ? 1 : -1;
        const month = new Date(customHeaderProps?.current?.month);
        const dateUpdated = new Date(month.setMonth(month.getMonth() + add));

        customHeaderProps?.current?.addMonth(add);
        props.setCurrentDate(dateUpdated);
    };

    /**
     * Increment / Decrement Years
     *
     */
    const setNewYear = ({ next }: { next: boolean }) => {
        const add = next ? 1 : -1;
        const currentDate = new Date(props.currentDate);
        const dateUpdated = new Date(currentDate.setFullYear(currentDate.getFullYear() + add));

        props.setCurrentDate(dateUpdated);
    };

    /**
     * Render Main
     *
     */
    return (
        <View>
            <View ref={ref} {...props} style={styles.customHeader}>
                <View style={styles.boxLeft}>
                    <View>
                        <ButtonCircle
                            icon={
                                <AntDesign name="banckward" size={18} color={colors.solidWhite} />
                            }
                            onPress={() => {
                                setNewYear({ next: false });
                            }}
                        />
                    </View>
                    <View>
                        <ButtonCircle
                            icon={
                                <AntDesign name="arrowleft" size={18} color={colors.solidWhite} />
                            }
                            onPress={() => {
                                setNewMonth({ next: false });
                            }}
                        />
                    </View>
                </View>
                <View style={styles.boxCenter}>
                    <Text variant="text" variantStyle={'introduction'}>
                        {dateFormatter(new Date(props.currentDate))}
                    </Text>
                </View>
                <View style={styles.boxRight}>
                    <View>
                        <ButtonCircle
                            icon={
                                <AntDesign name="arrowright" size={18} color={colors.solidWhite} />
                            }
                            onPress={() => {
                                setNewMonth({ next: true });
                            }}
                        />
                    </View>
                    <View>
                        <ButtonCircle
                            icon={<AntDesign name="forward" size={18} color={colors.solidWhite} />}
                            onPress={() => setNewYear({ next: true })}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.wrapperLabel}>
                {weekDays.map((day, index) => (
                    <Text
                        key={index}
                        style={styles.lable}
                        variant="text"
                        variantStyle={'introduction'}>
                        {day}
                    </Text>
                ))}
            </View>
        </View>
    );
});

/**
 * Styles
 *
 */
const styles = StyleSheet.create({
    wrapperLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 48,
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: colors.solidWhite,
    },
    lable: {
        color: colors.blue,
    },
    customHeader: {
        backgroundColor: colors.solidWhite,
        flexDirection: 'row',
        height: 32,
        alignItems: 'center',
        marginBottom: 4,
        paddingHorizontal: 8,
    },
    boxLeft: {
        flexDirection: 'row',
        columnGap: 8,
    },
    boxCenter: {
        flex: 1,
        alignItems: 'center',
    },
    boxRight: {
        flexDirection: 'row',
        columnGap: 8,
    },
});

export default CustomHeader;
