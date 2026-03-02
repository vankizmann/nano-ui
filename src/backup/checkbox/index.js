import Checkbox from "./src/checkbox/checkbox.ts";
import CheckboxGroup from "./src/checkbox-group/checkbox-group.ts";

export default function (App) {
    App.component(Checkbox.name, Checkbox);
    App.component(CheckboxGroup.name, CheckboxGroup);
}