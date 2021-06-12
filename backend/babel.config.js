module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@config': './src/config',
                    '@jobs': './src/jobs',
                    '@services': './src/services',
                    '@entities': './src/entities',
                    '@repositories': './src/repositories',
                    '@utils': './src/utils',
                    '@controllers': './src/controllers',
                    '@middlewares': './src/middlewares'
                }
            }
        ],
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        'transform-class-properties'
    ],
    ignore: ['**/*.spec.ts']
}
