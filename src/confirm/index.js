import Confirm from "./src/confirm/confirm.jsx";
import ConfirmHandler from "./src/confirm/confirm-handler.mjs";

export default function (App) {

    let ConfirmIcons = {
        primary: window.nano.Icons.info,
        secondary: window.nano.Icons.info,
        success: window.nano.Icons.success,
        warning: window.nano.Icons.warning,
        danger: window.nano.Icons.danger,
        info: window.nano.Icons.info
    };

    window.ConfirmIcons = pi.Obj.assign(ConfirmIcons,
        window.ConfirmIcons || {});

    let directives = [
        ConfirmHandler
    ];

    pi.Arr.each(directives, (glob) => {
        App.config.globalProperties[glob.alias] = window[glob.alias] = glob;
    });

    App.component(Confirm.name, Confirm);
}