import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ExpenseFilter } from '@api/queries/expense/useGetEspenseQuery';
import colors from '@common/colors';
import { commonStyle } from '@common/styles';
import Text from '@components/atoms/text';
import DefaultInput from '@components/molecules/inputes/input-default/DefaultInput';
import TransactionCategoryTemplate from '@components/templates/drawer/TransactionCategoryTemplate';
import { ExpenseCategory } from '@model/wallet';
import { useBottomSheet } from '@providers/bottom-sheet';
import { BOTTOM_SHEET_ID } from '@providers/bottom-sheet/type';

interface Props {
    onApplayFilter: (filter?: ExpenseFilter) => void;
}

/**
 *
 *
 */
const EspenseFilter: React.FC<Props> = ({ onApplayFilter }) => {
    const bottomSheet = useBottomSheet();

    const [show, setShow] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<ExpenseCategory>();

    /**
     *
     */
    const applyFilterHandler = useCallback(() => {
        onApplayFilter({
            amount,
            category,
        });
    }, [amount, category, onApplayFilter]);

    /**
     *
     */
    const openCategoryDrawer = useCallback(() => {
        bottomSheet.open({
            id: BOTTOM_SHEET_ID.TEST,
            title: 'Categoria di treansazione',
            content: (
                <TransactionCategoryTemplate
                    onConfirm={(category) => {
                        setCategory(category);
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
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                {show ? (
                    <View style={styles.innerWrapper}>
                        <View style={commonStyle.row}>
                            <TouchableOpacity
                                onPress={applyFilterHandler}
                                style={commonStyle.marginRight16}>
                                <Text
                                    variant="label"
                                    variantStyle="primaryCTA"
                                    style={{ color: colors.emerald2 }}>
                                    Apply
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onApplayFilter(undefined)}>
                                <Text
                                    variant="label"
                                    variantStyle="primaryCTA"
                                    style={{ color: colors.emerald2 }}>
                                    Clean
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={commonStyle.flex} />
                )}
                <View>
                    <TouchableOpacity onPress={() => setShow((current) => !current)}>
                        <MaterialCommunityIcons
                            name="filter-menu-outline"
                            size={32}
                            color={colors.emerald2}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {show ? (
                <View>
                    <View style={styles.wrapperInput}>
                        <DefaultInput
                            editable={false}
                            pointerEvents="none"
                            onPress={openCategoryDrawer}
                            placeholder="Categoria di Treansazione"
                            value={category ?? ''}
                            icon={
                                <MaterialIcons name="category" size={24} color={colors.emerald2} />
                            }
                        />
                    </View>
                    <View style={styles.wrapperInput}>
                        <DefaultInput
                            placeholder="Importo"
                            onChangeText={setAmount}
                            value={amount}
                            keyboardType="numeric"
                            icon={
                                <FontAwesome6
                                    name="sack-dollar"
                                    size={24}
                                    color={colors.emerald2}
                                />
                            }
                        />
                    </View>
                </View>
            ) : null}
        </View>
    );
};

/**
 *
 */
const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    headerWrapper: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginBottom: 16,
    },
    innerWrapper: {
        flex: 1,
        marginLeft: 16,
    },
    wrapperInput: {
        marginBottom: 10,
        paddingHorizontal: 16,
    },
});

export default EspenseFilter;
