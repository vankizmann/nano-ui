import Form from "./src/form/form.jsx";
import FormGroup from "./src/form-group/form-group.jsx";
import FormItem from "./src/form-item/form-item.jsx";
import FormFrame from "./src/form-frame/form-frame.jsx";

export default function (App) {
    App.component(Form.name, Form);
    App.component(FormGroup.name, FormGroup);
    App.component(FormItem.name, FormItem);
    App.component(FormFrame.name, FormFrame);
}