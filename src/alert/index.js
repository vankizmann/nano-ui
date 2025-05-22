export default function (App) {
    import("./src/alert/alert.js").then(({ Alert }) => {
        App.config.globalProperties[Alert.alias] = window[Alert.alias] = Alert.handle;
    });
}
