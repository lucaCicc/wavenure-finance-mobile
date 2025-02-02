import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SharedScreen, SharedStackParamList } from '@navigation/types/shared.types';
import CreateExpense from '@screens/expense/CreateExpense';
import CreateWalletScreen from '@screens/wallets/CreateWalletScreen';
import DetailsWalletScreen from '@screens/wallets/DetailsWalletScreen';

const Stack = createNativeStackNavigator<SharedStackParamList>();

const SharedStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name={SharedScreen.CREATE_WALLET} component={CreateWalletScreen} />
        <Stack.Screen name={SharedScreen.DETAILS_WALLET} component={DetailsWalletScreen} />
        <Stack.Screen name={SharedScreen.CREATE_EXPENSE} component={CreateExpense} />
    </Stack.Navigator>
);

export default SharedStack;
