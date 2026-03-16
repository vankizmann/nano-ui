import { App } from "vue";
import NButton from "./js/button/NButton.ts";
import NButtonGroup from "./js/button-group/NButtonGroup.ts";

export default function (App : App) {
    App.component(NButton.name, NButton);
    App.component(NButtonGroup.name, NButtonGroup);
}