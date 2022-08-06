# [App] Rocketshoes
![CircleCI](https://img.shields.io/circleci/build/github/DiegoVictor/rocketshoes-app?style=flat-square&logo=circleci)
[![react-native](https://img.shields.io/badge/react--native-0.63.2-61dafb?style=flat-square&logo=react)](https://reactnative.dev/)
[![redux](https://img.shields.io/badge/redux-4.0.5-764abc?style=flat-square&logo=redux)](https://redux.js.org/)
[![styled-components](https://img.shields.io/badge/styled_components-4.4.1-db7b86?style=flat-square&logo=styled-components)](https://styled-components.com/)
[![prettier](https://img.shields.io/badge/prettier-1.16.4-F7B93E?style=flat-square&logo=prettier)](https://prettier.io/)
[![eslint](https://img.shields.io/badge/eslint-6.8.0-4b32c3?style=flat-square&logo=eslint)](https://eslint.org/)
[![airbnb-style](https://flat.badgen.net/badge/style-guide/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![jest](https://img.shields.io/badge/jest-24.9.0-brightgreen?style=flat-square&logo=jest)](https://jestjs.io/)
[![coverage](https://img.shields.io/codecov/c/gh/DiegoVictor/rocketshoes-app?logo=codecov&style=flat-square)](https://codecov.io/gh/DiegoVictor/rocketshoes-app)
[![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](https://github.com/DiegoVictor/rocketshoes-app/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)<br>

This web application simulate a simple shoes store with cart system. All the resources used by this application comes from a fake [API](#api).

## Table of Contents
* [Screenshots](#screenshots)
* [Installing](#installing)
  * [Configuring](#configuring)
    * [.env](#env)
    * [API](#api)
* [Usage](#usage)
  * [OS](#os)
* [Running the tests](#running-the-tests)
  * [Coverage report](#coverage-report)

# Screenshots
Click to expand.<br>
<img src="https://raw.githubusercontent.com/DiegoVictor/rocketshoes-app/main/screenshots/dashboard.jpg" width="49%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/rocketshoes-app/main/screenshots/cart.jpg" width="49%" />

# Installing
Easy peasy lemon squeezy:
```
$ yarn
```
Or:
```
$ npm install
```
> Was installed and configured the [`eslint`](https://eslint.org/) and [`prettier`](https://prettier.io/) to keep the code clean and patterned.

## Configuring
Configure your environment variables and remember to start the [API](https://github.com/DiegoVictor/bethehero-api) before to start this app.

### .env
In this file you may configure the API's url. Rename the `.env.example` in the root directory to `.env` then just update with your settings.

key|description|default
---|---|---
API_URL|API's url|`http://localhost:3333`

### API
This application make usage of a third party library to create a fake API, you can see more information about it in [JSON Server](https://github.com/typicode/json-server) repository.

To start the API run:
```
$ yarn json-server server.json -p 3333
```
Or:
```
$ npx json-server server.json -p 3333
```
> Remember to update the `.env` if you choose another `port` or `host`. Also, maybe you need run reverse command to the API's port: `adb reverse tcp:3333 tcp:3333`

# Usage
The first build must be through USB connection, so connect your device (or just open your emulator) and run:
```
$ yarn react-native run-android
```
Or
```
$ npx react-native run-android
```
In the next times you can just run the Metro Bundler server:
```
$ yarn start
```
Or:
```
$ npm run start
```
> See for more information in [Running On Device](https://reactnative.dev/docs/running-on-device).

## OS
This app was tested only with Android through USB connection and [Genymotion](https://www.genymotion.com/) (Emulator), is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Running the tests
[Jest](https://jestjs.io/) was the choice to test the app, to run:
```
$ yarn test
```
Or:
```
$ npm run test
```

## Coverage report
You can see the coverage report inside `tests/coverage`. They are automatically created after the tests run.
