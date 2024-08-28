module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@screens': './src/screens',
        },
      },
    ],
    ['module:react-native-dotenv'],
    'react-native-reanimated/plugin',
    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true, // You can set this to false if you prefer
      },
    ],
  ],
  overrides: [
    {
      test: (filename) => !filename.includes('node_modules/react-native-maps'),
      plugins: [
        [
          '@babel/plugin-transform-private-methods',
          {
            loose: true,
          },
        ],
      ],
    },
  ],
};
