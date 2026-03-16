import { App } from "vue";
import NEmptyIcon from "./js/empty-icon/NEmptyIcon.ts";

export default function (App : App) {
    App.component(NEmptyIcon.name, NEmptyIcon);
}