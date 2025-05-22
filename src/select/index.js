import Select from "./src/select/select.jsx";
import SelectOption from "./src/select-option/select-option.jsx";

export default function (App) {
    App.component(Select.name, Select);
    App.component(SelectOption.name, SelectOption);
}
