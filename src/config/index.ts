import { App } from "vue";
import NConfig from "./js/config/NConfig.ts";

export default function (App : App) {
    App.component(NConfig.name, NConfig);
}