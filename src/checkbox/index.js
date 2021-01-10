import Vue from "vue";

import Checkbox from './src/checkbox/checkbox';
import CheckboxGroup from './src/checkbox-group/checkbox-group';

export default function (App) {
    App.component(Checkbox.name, Checkbox);
    App.component(CheckboxGroup.name, CheckboxGroup);
}