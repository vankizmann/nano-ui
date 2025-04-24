import Form from './src/form/form';
import FormGroup from './src/form-group/form-group';
import FormItem from './src/form-item/form-item';
import FormMenu from './src/form-menu/form-menu';
import FormFrame from './src/form-frame/form-frame';
import FormFrameItem from './src/form-frame-item/form-frame-item';

export default function (App) {
    App.component(Form.name, Form);
    App.component(FormGroup.name, FormGroup);
    App.component(FormItem.name, FormItem);
    App.component(FormFrame.name, FormFrame);
    App.component(FormFrameItem.name, FormFrameItem);
    App.component(FormMenu.name, FormMenu);
}