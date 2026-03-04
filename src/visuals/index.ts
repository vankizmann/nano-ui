import { App } from "vue";
import NTag from "./js/tag/NTag.ts";

export default function (App : App) {
    App.component(NTag.name, NTag);
}