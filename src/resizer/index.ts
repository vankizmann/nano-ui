import { App } from "vue";
import NResizer from "./js/resizer/NResizer.ts";

export default function (App : App) {
    App.component(NResizer.name, NResizer);
}