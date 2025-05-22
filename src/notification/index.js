export default function (App) {
    import("./src/notification/notification.js").then(({ Notify }) => {
        App.config.globalProperties[Notify.alias] = window[Notify.alias] = Notify.handle;
    });
}
