import Alert from './src/alert/alert';

export default function (App) {
    App.config.globalProperties[Alert.alias] = window[Alert.alias] = Alert.handle;
}
