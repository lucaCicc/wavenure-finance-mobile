import { randomUUID } from 'expo-crypto';
import { MMKV } from 'react-native-mmkv';

import Logger from '@helper/logger';
import { SecureStorageService, SecureUserCredentialsKey } from '@services/SecureStorageService';

enum TestStorageKey {
    KEY = 'Test.key',
}

interface Listener {
    remove: () => void;
}

type StorageKey = TestStorageKey | string;

/**
 *
 */
class SyncStorageService {
    private static instance: SyncStorageService;

    private mkv: MMKV | undefined;

    private constructor() {
        Logger.info({
            file: 'SyncStorageService.ts',
            functionName: 'constructor',
            message: 'Create SyncStorageService Instance',
        });
    }

    public static async initialize(): Promise<void> {
        SyncStorageService.instance = new SyncStorageService();

        let uuid = await SecureStorageService.getSecureDataAsync(
            SecureUserCredentialsKey.MMKV_UUID
        );
        if (!uuid) {
            uuid = randomUUID();
            await SecureStorageService.storeSecureDataAsync(
                SecureUserCredentialsKey.MMKV_UUID,
                uuid
            );
        }

        SyncStorageService.instance.mkv = new MMKV({
            id: 'app-storage',
            encryptionKey: uuid,
        });
    }

    public static getInstance(): SyncStorageService {
        return SyncStorageService.instance;
    }

    public getString(key: StorageKey) {
        return this.mkv?.getString(key);
    }

    public getBoolean(key: StorageKey) {
        return this.mkv?.getBoolean(key);
    }

    public set(key: StorageKey, value: boolean | string | number | ArrayBuffer) {
        return this.mkv?.set(key, value);
    }

    public delete(key: StorageKey) {
        return this.mkv?.delete(key);
    }

    public getNumber(key: StorageKey) {
        return this.mkv?.getNumber(key);
    }

    public getBuffer(key: StorageKey) {
        return this.mkv?.getBuffer(key);
    }

    public contains(key: StorageKey) {
        return this.mkv?.contains(key);
    }

    public getAllKeys() {
        return this.mkv?.getAllKeys();
    }

    public clearAll() {
        return this.mkv?.clearAll();
    }

    public recrypt(key: StorageKey | undefined) {
        return this.mkv?.recrypt(key);
    }

    public addOnValueChangedListener(
        onValueChanged: (key: StorageKey | string) => void
    ): Listener | undefined {
        return this.mkv?.addOnValueChangedListener(onValueChanged);
    }
}

export { TestStorageKey, SyncStorageService };
