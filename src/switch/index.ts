import { App } from "vue";
import NSwitch from "./js/switch/NSwitch.ts";

export default function (App: App) {
    App.component(NSwitch.name, NSwitch);
}