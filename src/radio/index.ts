import { App } from "vue";
import NRadio from "./js/radio/NRadio.ts";
import NRadioGroup from "./js/radio-group/NRadioGroup.ts";

export default function (App:App) {
    App.component(NRadio.name, NRadio);
    App.component(NRadioGroup.name, NRadioGroup);
}