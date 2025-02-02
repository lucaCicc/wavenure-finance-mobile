import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';

import AuthStack from '@navigation/stacks/AuthStack';
import SharedStack from '@navigation/stacks/SharedStack';
import BottomTabNav from '@navigation/stacks/TabBarStack';
import { MainStack as MainStackName, type MainStackParamList } from '@navigation/types/index.types';
import { getIsLogged } from '@store/modules/auth';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FunctionComponent = () => {
    const isLogged = useSelector(getIsLogged);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            {isLogged ? (
                <>
                    <Stack.Screen name={MainStackName.TAB_BAR_STACK} component={BottomTabNav} />
                    <Stack.Screen name={MainStackName.SHARED} component={SharedStack} />
                </>
            ) : (
                <Stack.Screen name={MainStackName.AUTH_STACK} component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};

export default MainStack;
