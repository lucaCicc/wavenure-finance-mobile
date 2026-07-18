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
    androidStatusBar: {
        translucent: true,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
        buildNumber: '1',
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
            "expo-font"
        ],
        [
            'expo-build-properties',
            {
                android: {
                    minSdkVersion: 26,
                    compileSdkVersion: 36,
                    targetSdkVersion: 34,
                    buildToolsVersion: '35.0.0',
                    kotlinVersion: '2.1.20',
                    enableProguardInReleaseBuilds: true,
                    enableShrinkResourcesInReleaseBuilds: true,
                },
                ios: {
                    deploymentTarget: '16.4',
                    useFrameworks: 'static',
                },
            },
        ],
        [
            'expo-splash-screen',
            {
                android: {
                    image: './assets/icon-app.png',
                    resizeMode: 'cover',
                    backgroundColor: '#FFFFFF',
                },
                ios: {
                    image: './assets/icon-app.png',
                    resizeMode: 'cover',
                    enableFullScreenImage_legacy: true,
                    backgroundColor: '#FFFFFF',
                },
                backgroundColor: '#FFFFFF',
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
