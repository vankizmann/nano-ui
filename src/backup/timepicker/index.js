import TimepickerPanel from "./src/timepicker-panel/timepicker-panel.ts";
import Timepicker from "./src/timepicker/timepicker.ts";

export default function (App) {
    App.component(TimepickerPanel.name, TimepickerPanel);
    App.component(Timepicker.name, Timepicker);
}