import TimepickerPanel from "./src/timepicker-panel/timepicker-panel";
import Timepicker from "./src/timepicker/timepicker";

export default function (App) {
    App.component(TimepickerPanel.name, TimepickerPanel);
    App.component(Timepicker.name, Timepicker);
}