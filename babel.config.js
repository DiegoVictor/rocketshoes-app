module.exports = {
  presets: ['@babel/preset-react'],
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
