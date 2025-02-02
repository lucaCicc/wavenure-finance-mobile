import type { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
    ...config,
    scheme: 'financeapp',
    name: 'FinanceApp',
    slug: 'FinanceApp',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    platforms: ['ios', 'android'],
    newArchEnabled: true,
    jsEngine: 'hermes',
    androidStatusBar: {
        translucent: true,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        buildNumber: '1',
        icon: './assets/icon-app.png',
        supportsTablet: true,
        bundleIdentifier: 'com.financeapp',
    },
    android: {
        adaptiveIcon: {
            backgroundImage: './assets/icon-app.png',
            foregroundImage: './assets/icon-app.png',
        },
        versionCode: 3,
        package: 'com.financeapp',
        // googleServicesFile: './google-services.json',
        allowBackup: false,
        softwareKeyboardLayoutMode: 'pan',
        intentFilters: [
            {
                action: 'VIEW',
                data: [
                    {
                        scheme: 'financeapp',
                    },
                ],
                category: ['BROWSABLE', 'DEFAULT'],
            },
        ],
    },
    runtimeVersion: '1.0.0',
    updates: {
        enabled: false,
        url: 'http://localhost:3000/api/manifest',
    },
    plugins: [
        [
            'expo-build-properties',
            {
                android: {
                    minSdkVersion: 26,
                    compileSdkVersion: 35,
                    targetSdkVersion: 34,
                    buildToolsVersion: '35.0.0',
                    kotlinVersion: '1.9.24',
                    enableProguardInReleaseBuilds: true,
                    enableShrinkResourcesInReleaseBuilds: true,
                },
                ios: {
                    deploymentTarget: '15.1',
                    useFrameworks: 'static',
                },
            },
        ],
        [
            'expo-splash-screen',
            {
                backgroundColor: '#FFFFFF',
                image: './assets/icon-app.png',
                dark: {
                    image: './assets/icon-app.png',
                    backgroundColor: '#000000',
                },
                imageWidth: 200,
            },
        ],
        ['expo-localization'],
        ['expo-secure-store'],
    ],
});
