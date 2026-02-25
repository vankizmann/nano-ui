import NPopover from "./js/popover/NPopover.js";
import NPopoverGroup from "./js/popover-group/NPopoverGroup.js";
import NPopoverOption from "./js/popover-option/NPopoverOption.js";

export default function (App) {
    App.component(NPopover.name, NPopover);
    App.component(NPopoverGroup.name, NPopoverGroup);
    App.component(NPopoverOption.name, NPopoverOption);
}