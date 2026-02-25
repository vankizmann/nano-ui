import NRadio from "./js/radio/NRadio.js";
import NRadioGroup from "./js/radio-group/NRadioGroup.js";

export default function (App) {
    App.component(NRadio.name, NRadio);
    App.component(NRadioGroup.name, NRadioGroup);
}