import { App } from "vue";
import NCheckbox from "./js/checkbox/NCheckbox.ts";
import NCheckboxGroup from "./js/checkbox-group/NCheckboxGroup.ts";

export default function (App : App) {
    App.component(NCheckbox.name, NCheckbox);
    App.component(NCheckboxGroup.name, NCheckboxGroup);
}