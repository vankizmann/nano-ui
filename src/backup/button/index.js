import Button from "./src/button/button.jsx";
import ButtonGroup from "./src/button-group/button-group.jsx";

export default function (App) {
    App.component(Button.name, Button);
    App.component(ButtonGroup.name, ButtonGroup);
}
