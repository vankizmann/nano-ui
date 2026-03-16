import { App } from "vue";
import NAlertHandler from "./js/alert/NAlertHandler.ts";
import NConfirmHandler from "./js/confirm/NConfirmHandler.ts";
import NNotifyHandler from "./js/notify/NNotifyHandler.ts";

export default function (App : App) {
    //
}

if ( ! globalThis.Alert ) {
    globalThis.Alert = NAlertHandler;
}

if ( ! globalThis.Confirm ) {
    globalThis.Confirm = NConfirmHandler;
}

if ( ! globalThis.Notify ) {
    globalThis.Notify = NNotifyHandler;
}