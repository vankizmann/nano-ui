import NCheckbox from "./js/checkbox/NCheckbox.js";
import NCheckboxGroup from "./js/checkbox-group/NCheckboxGroup.js";

export default function (App) {
    App.component(NCheckbox.name, NCheckbox);
    App.component(NCheckboxGroup.name, NCheckboxGroup);
}