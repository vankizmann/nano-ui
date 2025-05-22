import NRadio from "./src/radio/radio.jsx";
import NRadioGroup from "./src/radio-group/radio-group.jsx";

export default function (App) {
    App.component(NRadio.name, NRadio);
    App.component(NRadioGroup.name, NRadioGroup);
}
