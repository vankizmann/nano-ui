import NButton from "./js/button/NButton.js";
import NButtonGroup from "./js/button-group/NButtonGroup.js";

export default function (App) {
    App.component(NButton.name, NButton);
    App.component(NButtonGroup.name, NButtonGroup);
}