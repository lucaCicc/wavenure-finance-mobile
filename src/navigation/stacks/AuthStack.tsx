import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthScreen, AuthStackParamList } from '@navigation/types/auth.types';
import LoginScreen from '@screens/auth/LoginScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name={AuthScreen.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
);

export default AuthStack;
