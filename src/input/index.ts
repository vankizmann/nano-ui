import { App } from "vue";
import NInput from "./js/input/NInput.ts";
import NInputNumber from "./js/input-number/NInputNumber.ts";
import NInputFile from "./js/input-file/NInputFile.ts";
import NTextarea from "./js/textarea/NTextarea.ts";

export default function (App : App) {
    App.component(NInput.name, NInput);
    App.component(NInputNumber.name, NInputNumber);
    App.component(NInputFile.name, NInputFile);
    App.component(NTextarea.name, NTextarea);
}
