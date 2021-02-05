import Popover from './src/popover/popover';
import PopoverGroup from './src/popover-group/popover-group';
import PopoverOption from './src/popover-option/popover-option';

export default function (App) {
    App.component(Popover.name, Popover);
    App.component(PopoverGroup.name, PopoverGroup);
    App.component(PopoverOption.name, PopoverOption);
}