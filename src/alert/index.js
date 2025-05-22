import Alert from "./src/alert/alert.js";

export default function (App) {
    App.config.globalProperties[Alert.alias] = window[Alert.alias] = Alert.handle;
}
