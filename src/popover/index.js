import Popover from './src/popover/popover';
import PopoverOption from './src/popover-option/popover-option';

export default function (App) {
    App.component(Popover.name, Popover);
    App.component(PopoverOption.name, PopoverOption);
}