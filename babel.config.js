module.exports = function (api) {
    const babelEnv = api.env();
    api.cache(true);

    const plugins = [
        [
            'module-resolver',
            {
                alias: {
                    '@api': './src/api',
                    '@navigation': './src/navigation',
                    '@components': './src/components',
                    '@providers': './src/providers',
                    '@containers': './src/containers',
                    '@screens': './src/screens',
                    '@config': './src/config',
                    '@helper': './src/helpers',
                    '@services': './src/services',
                    '@hooks': './src/hooks',
                    '@styles': './src/styles',
                    '@common': './src/common',
                    '@model': './src/models',
                    '@i18n': './src/i18n',
                    '@mocks': './src/mocks',
                    '@store': './src/store',
                    '@assets': './src/assets',
                    '@native': './src/native',
                    '@utils': './src/utils',
                    '@core': './src/core',
                    '@/*': './src',
                },
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.ios.jsx',
                    '.android.jsx',
                    '.js',
                    '.jsx',
                    '.json',
                    '.ts',
                    '.tsx',
                ],
                root: ['.'],
            },
        ],
    ];

    if (babelEnv !== 'development') {
        plugins.push(['transform-remove-console']);
    }

    return {
        presets: ['babel-preset-expo'],
        plugins,
    };
};
