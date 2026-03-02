import { App } from "vue";
import NPopover from "./js/popover/NPopover.ts";
import NPopoverGroup from "./js/popover-group/NPopoverGroup.ts";
import NPopoverOption from "./js/popover-option/NPopoverOption.ts";

export default function (App:App) {
    App.component(NPopover.name, NPopover);
    App.component(NPopoverGroup.name, NPopoverGroup);
    App.component(NPopoverOption.name, NPopoverOption);
}