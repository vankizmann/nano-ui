import NRadio from "./src/radio/radio.ts";
import NRadioGroup from "./src/radio-group/radio-group.ts";

export default function (App) {
    App.component(NRadio.name, NRadio);
    App.component(NRadioGroup.name, NRadioGroup);
}
