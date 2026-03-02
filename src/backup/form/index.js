import Form from "./src/form/form.ts";
import FormBag from "./src/form-bag/form-bag.ts";
import FormGroup from "./src/form-group/form-group.ts";
import FormItem from "./src/form-item/form-item.ts";
import FormFrame from "./src/form-frame/form-frame.ts";

export default function (App) {
    App.component(Form.name, Form);
    App.component(FormBag.name, FormBag);
    App.component(FormGroup.name, FormGroup);
    App.component(FormItem.name, FormItem);
    App.component(FormFrame.name, FormFrame);
}