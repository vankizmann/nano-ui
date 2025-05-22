import Notifcation from "./src/notification/notification.js";

export default function (App) {
    App.config.globalProperties[Notifcation.alias] = window[Notifcation.alias] = Notifcation.handle;
}
