import NInput from "./js/input/NInput.js";
import NInputNumber from "./js/input-number/NInputNumber.js";
import NTextarea from "./js/textarea/NTextarea.js";

export default function (App) {
    App.component(NInput.name, NInput);
    App.component(NInputNumber.name, NInputNumber);
    App.component(NTextarea.name, NTextarea);
}
