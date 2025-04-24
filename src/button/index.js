import Button from './src/button/button';
import ButtonGroup from './src/button-group/button-group';

export default function (App) {
    App.component(Button.name, Button);
    App.component(ButtonGroup.name, ButtonGroup);
}
