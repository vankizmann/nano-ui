import AlertHandler from "./src/alert/alert-handler.mjs";

export default function (App) {

    let AlertIcons = {
        primary: window.nano.Icons.info,
        secondary: window.nano.Icons.info,
        success: window.nano.Icons.success,
        warning: window.nano.Icons.warning,
        danger: window.nano.Icons.danger,
        info: window.nano.Icons.info
    };

    window.AlertIcons = pi.Obj.assign(AlertIcons,
        window.AlertIcons || {});

    let directives = [
        AlertHandler
    ];

    pi.Arr.each(directives, (glob) => {
        App.config.globalProperties[glob.alias] = window[glob.alias] = glob;
    });

}
