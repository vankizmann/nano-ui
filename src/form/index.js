import Form from './src/form/form';
import FormGroup from './src/form-group/form-group';
import FormItem from './src/form-item/form-item';

export default function (App) {
    App.component(Form.name, Form);
    App.component(FormGroup.name, FormGroup);
    App.component(FormItem.name, FormItem);
}