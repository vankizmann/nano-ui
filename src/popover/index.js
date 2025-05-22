import Popover from "./src/popover/popover.jsx";
import PopoverGroup from "./src/popover-group/popover-group.jsx";
import PopoverOption from "./src/popover-option/popover-option.jsx";

export default function (App) {
    App.component(Popover.name, Popover);
    App.component(PopoverGroup.name, PopoverGroup);
    App.component(PopoverOption.name, PopoverOption);
}