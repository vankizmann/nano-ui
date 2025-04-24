import Vue from "vue";

import Select from './src/select/select';
import SelectOption from './src/select-option/select-option';

export default function (App) {
    App.component(Select.name, Select);
    App.component(SelectOption.name, SelectOption);
}
