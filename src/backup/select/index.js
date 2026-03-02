import Select from "./src/select/select.ts";
import SelectOption from "./src/select-option/select-option.ts";

export default function (App) {
    App.component(Select.name, Select);
    App.component(SelectOption.name, SelectOption);
}
