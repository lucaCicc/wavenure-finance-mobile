import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';

import AuthStack from '@navigation/stacks/AuthStack';
import BottomTabNav from '@navigation/stacks/TabBarStack';
import { MainStack as MainStackName, type MainStackParamList } from '@navigation/types/index.types';
import { getAccessToken, getIsLogged } from '@store/modules/auth';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FunctionComponent = () => {
    const isLogged = useSelector(getIsLogged);
    const accessToken = useSelector(getAccessToken);

    console.log('isLogged', isLogged, accessToken);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            {isLogged ? (
                <Stack.Screen name={MainStackName.TAB_BAR_STACK} component={BottomTabNav} />
            ) : (
                <Stack.Screen name={MainStackName.AUTH_STACK} component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default MainStack;
