import { App } from "vue";
import NInput from "./js/input/NInput.ts";
import NInputNumber from "./js/input-number/NInputNumber.ts";
import NTextarea from "./js/textarea/NTextarea.ts";

export default function (App : App) {
    App.component(NInput.name, NInput);
    App.component(NInputNumber.name, NInputNumber);
    App.component(NTextarea.name, NTextarea);
}
