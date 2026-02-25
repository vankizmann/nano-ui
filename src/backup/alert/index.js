import AlertHandler from "./src/alert/alert-handler.mjs";

export default function (App) {

    window.AlertIcons = pi.Obj.assign(window.nano.Icons,
        window.AlertIcons || {});

    let directives = [
        AlertHandler
    ];

    pi.Arr.each(directives, (glob) => {
        App.config.globalProperties[glob.alias] = window[glob.alias] = glob;
    });

}
