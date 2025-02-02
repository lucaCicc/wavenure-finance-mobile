import {
    AntDesign,
    Feather,
    FontAwesome,
    FontAwesome6,
    Ionicons,
    MaterialIcons,
} from '@expo/vector-icons';
import React from 'react';

import { ExpenseCategory } from '@model/wallet';

type ExpenseIconProps = {
    name: ExpenseCategory;
};

const ExpenseIcon: React.FC<ExpenseIconProps> = ({ name }) => {
    switch (name) {
        case 'WORK':
            return <FontAwesome name="black-tie" size={24} color="black" />;
        case 'FAMILY':
            return <MaterialIcons name="family-restroom" size={24} color="black" />;
        case 'GIFT':
            return <AntDesign name="gift" size={24} color="black" />;
        case 'SHOPPING':
            return <AntDesign name="shoppingcart" size={24} color="black" />;
        case 'HOME':
            return <FontAwesome name="home" size={24} color="black" />;
        case 'CAR':
            return <AntDesign name="car" size={24} color="black" />;
        case 'FOOD':
            return <Ionicons name="fast-food-outline" size={24} color="black" />;
        case 'TRAVEL':
            return <MaterialIcons name="travel-explore" size={24} color="black" />;
        case 'TRANSPORT':
            return <MaterialIcons name="emoji-transportation" size={24} color="black" />;
        case 'OTHER':
            return <Feather name="more-horizontal" size={24} color="black" />;
        case 'SALARY':
            return <FontAwesome6 name="sack-dollar" size={24} color="black" />;
        case 'LOAN':
            return <FontAwesome name="bank" size={24} color="black" />;
        case 'EXTRA_INCOME':
            return <Ionicons name="cash-outline" size={24} color="black" />;

        default:
            return <Feather name="more-horizontal" size={24} color="black" />;
    }
};

export default ExpenseIcon;
