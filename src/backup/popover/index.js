import Popover from "./src/popover/popover.ts";
import PopoverGroup from "./src/popover-group/popover-group.ts";
import PopoverOption from "./src/popover-option/popover-option.ts";

import PopoverElement from "./src/popover/popover-element.mjs";
import PopoverHandler from "./src/popover/popover-handler.mjs";
import PopoverHelper from "./src/popover/popover-helper.mjs";

export default function (App) {

    let directives = [
        PopoverElement, PopoverHandler, PopoverHelper
    ];

    pi.Arr.each(directives, (glob) => {
        App.config.globalProperties[glob.alias] = window[glob.alias] = glob;
    });

    let components = [
        Popover, PopoverGroup, PopoverOption
    ];

    pi.Arr.each(components, (comp) => {
        App.component(comp.name, comp);
    });
}