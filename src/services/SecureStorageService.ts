import * as SecureStore from 'expo-secure-store';

enum SecureUserCredentialsKey {
    MMKV_UUID = 'SecureStorageKey.MMKV_UUID',
    USER_CREDENTIALS = 'SecureStorageKey.USER_CREDENTIALS',
}

type SecureStorageKeys = SecureUserCredentialsKey;

const options: SecureStore.SecureStoreOptions = {
    keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    requireAuthentication: false,
};

/**
 *
 */
class SecureStorageService {
    public static async storeSecureDataAsync(key: SecureStorageKeys, value: string) {
        try {
            await SecureStore.setItemAsync(key, value, options);
        } catch {
            throw Error(`Unable to securely store data.`);
        }
    }

    public static async deleteSecureDataAsync(key: SecureStorageKeys) {
        try {
            await SecureStore.deleteItemAsync(key, options);
        } catch {
            throw Error(`Unable to delete secure data.`);
        }
    }

    public static async getSecureDataAsync(key: SecureStorageKeys) {
        try {
            return await SecureStore.getItemAsync(key, options);
        } catch {
            throw Error(`Unable to retrieve secure data.`);
        }
    }
}

export { SecureStorageService, SecureUserCredentialsKey };
