import Button from "./src/button/button.ts";
import ButtonGroup from "./src/button-group/button-group.ts";

export default function (App) {
    App.component(Button.name, Button);
    App.component(ButtonGroup.name, ButtonGroup);
}
