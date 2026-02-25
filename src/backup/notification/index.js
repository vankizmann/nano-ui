import NotificationElement from "./src/notification/notification-element.mjs";
import NotificationHandler from "./src/notification/notification-handler.mjs";

export default function (App) {

    const NotifcationIcons = {
        primary: window.nano.Icons.info,
        secondary: window.nano.Icons.info,
        success: window.nano.Icons.success,
        warning: window.nano.Icons.warning,
        danger: window.nano.Icons.danger,
        info: window.nano.Icons.info
    };

    window.NotifcationIcons = pi.Obj.assign(NotifcationIcons,
        window.NotifcationIcons || {});

    let directives = [
        NotificationElement, NotificationHandler
    ];

    pi.Arr.each(directives, (glob) => {
        App.config.globalProperties[glob.alias] = window[glob.alias] = glob;
    });
}