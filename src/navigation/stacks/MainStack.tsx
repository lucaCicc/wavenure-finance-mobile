import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Home from '@screens/home/Home';

const Stack = createNativeStackNavigator();

const MainStack: React.FunctionComponent = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name={'Home'} component={Home} />
    </Stack.Navigator>
);

export default MainStack;
