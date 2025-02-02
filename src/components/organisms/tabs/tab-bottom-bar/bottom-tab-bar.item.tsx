import * as Icon from '@expo/vector-icons';
import React, { useMemo } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity, Text } from 'react-native';

import colors from '@common/colors';

import styles from './bottom-tab-bar.styles';

interface Props extends TouchableOpacityProps {
    iconName: string;
    text: string;
    isSelected: boolean;
}

/**
 *
 *
 */
const BottomTabBarItem = ({ iconName, text, isSelected, ...otherProps }: Props) => {
    const renderIcon = useMemo(() => {
        if (iconName === 'home') {
            return (
                <Icon.Feather
                    name={'home'}
                    size={24}
                    color={isSelected ? colors.emerald2 : colors.doveGray}
                />
            );
        }
        if (iconName === 'wallet') {
            return (
                <Icon.Entypo
                    name={'wallet'}
                    size={24}
                    color={isSelected ? colors.emerald2 : colors.doveGray}
                />
            );
        }
        if (iconName === 'budget') {
            return (
                <Icon.FontAwesome6
                    name={'sack-dollar'}
                    size={24}
                    color={isSelected ? colors.emerald2 : colors.doveGray}
                />
            );
        }
        if (iconName === 'others') {
            return (
                <Icon.Feather
                    name={'more-horizontal'}
                    size={24}
                    color={isSelected ? colors.emerald2 : colors.doveGray}
                />
            );
        }
    }, [iconName, isSelected]);

    /**
     * Main render
     *
     */
    return (
        <TouchableOpacity style={styles.tab} {...otherProps}>
            {renderIcon}

            <Text
                numberOfLines={1}
                style={[styles.text, { color: isSelected ? colors.emerald2 : colors.doveGray }]}
                allowFontScaling={false}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default BottomTabBarItem;
