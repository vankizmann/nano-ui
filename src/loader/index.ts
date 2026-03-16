import { App } from "vue";
import NLoader from "./js/loader/NLoader.ts";

export default function (App : App) {
    App.component(NLoader.name, NLoader);
}