import Checkbox from "./src/checkbox/checkbox.jsx";
import CheckboxGroup from "./src/checkbox-group/checkbox-group.jsx";

export default function (App) {
    App.component(Checkbox.name, Checkbox);
    App.component(CheckboxGroup.name, CheckboxGroup);
}