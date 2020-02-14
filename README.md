# About
A fake shoes mobile store
<br/><br/>
<img src="https://raw.githubusercontent.com/DiegoVictor/rocketshoes-app/master/screenshots/dashboard.jpg" width="49%" />
<img src="https://raw.githubusercontent.com/DiegoVictor/rocketshoes-app/master/screenshots/cart.jpg" width="49%" />

# OS
This app was tested only with Android through USB connection, is strongly recommended to use the same operational system, but of course you can use an emulator or a real device connected through wifi or USB.

# Install
```
$ yarn
```

# Dependencies
Was installed and configured the `eslint` and `prettier` to keep the code clean and patterned.

# Reactotron
This project is configured with [Reactotron](https://github.com/infinitered/reactotron), just open the Reactotron GUI before the app is up and running, after start the app Reactotron will identify new connections.
> If Reactotron show an empty timeline after the app is running try run `adb reverse tcp:9090 tcp:9090`, then reload the app.

# .env
Rename the `.env.example` to `.env` then just update with yours settings.

# API
Start the server the fake server:
```
$ yarn json-server server.json -p 3333
```
> If any change in the fake api's port (the `-p` option) was made remember to update the `.env` too. Also, maybe you need run reverse again but this time to the api: `adb reverse tcp:3333 tcp:3333`

# Start up
The first build must be through USB connection, so connect your device (or just open your emulator) and run:
```
$ yarn react-native run-android
```
In the next times yuu can just run the Metro Bundler server:
```
$ yarn start
```

# Tests
```
$ yarn test
```
> And `yarn coverage` to run tests with coverage
