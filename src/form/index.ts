import { App } from "vue";
import NForm from "./js/form/NForm.ts";
import NFormItem from "./js/form-item/NFormItem.ts";
import NFormBag from "./js/form-bag/NFormBag.ts";
import NFormGroup from "./js/form-group/NFormGroup.ts";
import NFormFrame from "./js/form-frame/NFormFrame.ts";

export default function (App : App) {
    App.component(NForm.name, NForm);
    App.component(NFormItem.name, NFormItem);
    App.component(NFormBag.name, NFormBag);
    App.component(NFormGroup.name, NFormGroup);
    App.component(NFormFrame.name, NFormFrame);
}