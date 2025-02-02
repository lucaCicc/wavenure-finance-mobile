import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

import useQueryLogin from '@api/queries/auth/useQueryLogin';
import colors from '@common/colors';
import Text from '@components/atoms/text';
import ConfirmButton from '@components/molecules/buttons/button-confirm/ConfirmButton';
import EmailInput from '@components/molecules/inputes/input-email/EmailInput';
import PasswordInput from '@components/molecules/inputes/input-password/PasswordInput';
import { HttpError } from '@model/error';
import { setAccessToken } from '@store/modules/auth';

/**
 *
 *
 */
const LoginScreen = () => {
    const dispatch = useDispatch();
    const { login, isQueryLoading } = useQueryLogin();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    /**
     * TO DO: move this logic off the screen
     *
     */
    const handlerLogin = useCallback(() => {
        login(
            { email, password },
            {
                onSuccess: (loginResponse) => {
                    dispatch(setAccessToken(loginResponse.token));
                },
                onError: (httpError: HttpError) => {
                    setError(httpError.message);
                },
            }
        );
    }, [dispatch, email, login, password]);

    /**
     * Main render
     *
     */
    return (
        <SafeAreaView style={styles.container}>
            <Text variant="title" variantStyle={'h1'}>
                Login
            </Text>

            <View style={styles.marginBottom16}>
                <EmailInput placeholder="email" onChange={setEmail} />
            </View>

            <View style={styles.marginBottom16}>
                <PasswordInput placeholder="password" onChange={setPassword} />
            </View>

            <View>
                <ConfirmButton
                    title={'Confirm'}
                    onPress={handlerLogin}
                    isLoading={isQueryLoading}
                />
            </View>

            {error ? (
                <Text variant="label" variantStyle="data">
                    {error}
                </Text>
            ) : null}
        </SafeAreaView>
    );
};

/**
 * Styles
 *
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.pampas,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    marginBottom16: {
        marginBottom: 16,
    },
});

export default LoginScreen;
