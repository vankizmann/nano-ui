import Confirm from "./src/confirm/confirm.jsx";

export default function (App) {

    import('./src/confirm/confirm.mjs').then(({ConfirmModule}) => {
        App.config.globalProperties[ConfirmModule.alias] = ConfirmModule;
    });

    App.component(Confirm.name, Confirm);
}