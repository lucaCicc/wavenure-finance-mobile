import * as LocalAuth from 'expo-local-authentication';

import Logger from '@helper/logger';
import { SecureStorageService, SecureUserCredentialsKey } from '@services/SecureStorageService';
import { IS_ANDROID, IS_IOS } from '@utils/system.utils';

export enum BiometricAuthResult {
    CANCELLED = 'CANCELLED',
    DISABLED = 'DISABLED',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    LOADING = 'LOADING',
}

type Credentials = { clientCode: string; password: string };

/**
 *
 */
class BiometricAuthService {
    private static instance: BiometricAuthService;

    private constructor() {
        Logger.info({
            file: 'BiometricAuthService.ts',
            functionName: 'constructor',
            message: 'Create BiometricAuthService Instance',
        });
    }

    public static getInstance(): BiometricAuthService {
        if (!BiometricAuthService.instance) {
            BiometricAuthService.instance = new BiometricAuthService();
        }

        return BiometricAuthService.instance;
    }

    public static async isFacialRecognitionSupported(): Promise<boolean> {
        return LocalAuth.supportedAuthenticationTypesAsync().then((types) =>
            types.includes(LocalAuth.AuthenticationType.FACIAL_RECOGNITION)
        );
    }

    public static async checkSupportedAuth(): Promise<boolean> {
        const types: LocalAuth.AuthenticationType[] =
            await LocalAuth.supportedAuthenticationTypesAsync();

        if (types?.length) {
            if (
                IS_IOS &&
                (types.includes(LocalAuth.AuthenticationType.FACIAL_RECOGNITION) ||
                    types.includes(LocalAuth.AuthenticationType.FINGERPRINT))
            ) {
                Logger.info({
                    file: 'BiometricAuthService.ts',
                    functionName: 'checkIsSupportedAuth',
                    message: 'Kinds of authentications available: facial recognition',
                });

                return true;
            }

            if (IS_ANDROID && types.includes(LocalAuth.AuthenticationType.FINGERPRINT)) {
                Logger.info({
                    file: 'BiometricAuthService.ts',
                    functionName: 'checkIsSupportedAuth',
                    message: 'Kinds of authentications available: fingerprint recognition',
                });

                return true;
            }
        }

        Logger.info({
            file: 'BiometricAuthService.ts',
            functionName: 'checkIsSupportedAuth',
            message: 'Kinds of authentications available: none',
        });

        return false;
    }

    public static async checkEnrolled(): Promise<boolean> {
        const isEnrolled = await LocalAuth.isEnrolledAsync();

        Logger.info({
            file: 'BiometricAuthService.ts',
            functionName: 'checkIsEnrolled',
            message: `Authentication data saved (fingerprints or facial): ${isEnrolled}`,
        });

        return isEnrolled;
    }

    public static async checkBiometricAuthAvailable(): Promise<boolean> {
        const isEnrolled = await this.checkEnrolled();
        const isSupported = await this.checkSupportedAuth();

        // TODO - if supported but not enrolled, show alert to enroll
        Logger.info(
            {
                file: 'BiometricAuthService.ts',
                functionName: 'checkIsBiometricAuthAvailable',
            },
            isEnrolled && isSupported
        );

        return isEnrolled && isSupported;
    }

    public static async authenticate(): Promise<{
        status: BiometricAuthResult;
    }> {
        try {
            // check if biometric authentication is supported
            const isSupported = await this.checkSupportedAuth();

            if (!isSupported) {
                Logger.warning({
                    file: 'BiometricAuthService.ts',
                    functionName: 'authenticate',
                    message: 'Biometric authentication is not supported.',
                });

                return {
                    status: BiometricAuthResult.DISABLED,
                };
            }

            // check if biometric authentication is enrolled
            const isEnrolled = await this.checkEnrolled();

            if (!isEnrolled) {
                Logger.warning({
                    file: 'BiometricAuthService.ts',
                    functionName: 'authenticate',
                    message: 'Biometric authentication is not enrolled.',
                });

                return {
                    status: BiometricAuthResult.DISABLED,
                };
            }

            // authenticate
            const results: LocalAuth.LocalAuthenticationResult =
                await LocalAuth.authenticateAsync();

            Logger.info(
                {
                    file: 'BiometricAuthService.ts',
                    functionName: 'authenticate',
                },
                results
            );

            if (results.success) {
                return {
                    status: BiometricAuthResult.SUCCESS,
                };
            }

            if (results.error === 'unknown') {
                return {
                    status: BiometricAuthResult.DISABLED,
                };
            }

            if (
                results.error === 'user_cancel' ||
                results.error === 'system_cancel' ||
                results.error === 'app_cancel'
            ) {
                return {
                    status: BiometricAuthResult.CANCELLED,
                };
            }

            return {
                status: BiometricAuthResult.ERROR,
            };
        } catch {
            return {
                status: BiometricAuthResult.ERROR,
            };
        }
    }

    public static storeSecureDataAsync(value: Credentials) {
        SecureStorageService.storeSecureDataAsync(
            SecureUserCredentialsKey.USER_CREDENTIALS,
            JSON.stringify(value)
        )
            .then(() => {
                Logger.info({
                    file: 'BiometricAuthService',
                    functionName: 'storeSecureDataAsync',
                    message: 'Secure data stored.',
                });
            })
            .catch((error) => {
                Logger.error({
                    file: 'BiometricAuthService.ts',
                    functionName: 'storeSecureDataAsync',
                    message: error.message,
                });
            });
    }

    public static async getSecureDataAsync() {
        const savedValue = await SecureStorageService.getSecureDataAsync(
            SecureUserCredentialsKey.USER_CREDENTIALS
        );

        return JSON.parse(savedValue ?? '{}') as Credentials;
    }

    public static deleteSecureDataAsync() {
        SecureStorageService.deleteSecureDataAsync(SecureUserCredentialsKey.USER_CREDENTIALS)
            .then(() => {
                Logger.info({
                    file: 'BiometricAuthService.ts',
                    functionName: 'deleteSecureDataAsync',
                    message: 'Secure data deleted.',
                });
            })
            .catch((error) => {
                Logger.error({
                    file: 'BiometricAuthService.ts',
                    functionName: 'deleteSecureDataAsync',
                    message: error.message,
                });
            });
    }
}

export default BiometricAuthService;
