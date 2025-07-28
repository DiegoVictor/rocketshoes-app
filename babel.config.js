module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
