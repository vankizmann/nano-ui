import { App } from "vue";
import NTransfer from "./js/transfer/NTransfer.ts";

export default function (App : App) {
    App.component(NTransfer.name, NTransfer);
}