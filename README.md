# RuptivaCLI
RuptivaCLI is a **react-native/expo** wrapper.
This CLI creates a new React Native Project using **react-native init** or **create-react-native-app**,
implementing [ducks-modular-redux](https://github.com/erikras/ducks-modular-redux) (if you want).

## Instalation
`npm install -g ruptiva-cli`

## Usage
`ruptiva-cli init`

## Folder structure
```
projectName/
└── src/
    ├── assets
    ├── components
    ├── config
    ├── services
    └── views
```

`assets: ` Images, fonts, _et cetera_.

`components: ` Small (or large, whatever) components.

`config:` App configuration, like navigation, store, font loaders.

`services:` Functions which are used in multiple places inside your app .

_Example:_
```
//Add 0s (zeroes) in numbers with 1 digit
const z = n => (n < 10 && n > -10 ? `0${n}` : n)

//Convert ms to readable time format (in this case hh:mm:ss)
export const msToTime = ms => {
    let s = ms / 1000
    let h = parseInt(s / 3600);
    s = s % 3600
    let m = parseInt(s / 60);
    s = s % 60
    return (z(h) + ':' + z(m) + ':' + z(s));
    }
```
`views` App screens. I could named this `screens`, but i prefer `views`. Deal with it.

If you added **Redux**, you have now more stuff inside your project :
```
projectName/
└── src/
    ├── assets
    ├── components
    ├── config
    │	└── Store.js <-- this is new
    ├── ducks <-- this is new
    │	├── Auth.js
    │	└── index.js
    ├── services
    └── views
```
`ducks:` This CLI implements **ducks-modular-redux**. See more about in their [docs](https://github.com/erikras/ducks-modular-redux)

`ducks/Auth.js:` Just a boilerplate. But you will probably use that.

`ducks/index.js:` exports _combineReducers_.