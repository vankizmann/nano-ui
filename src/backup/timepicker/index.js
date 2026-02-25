import TimepickerPanel from "./src/timepicker-panel/timepicker-panel.jsx";
import Timepicker from "./src/timepicker/timepicker.jsx";

export default function (App) {
    App.component(TimepickerPanel.name, TimepickerPanel);
    App.component(Timepicker.name, Timepicker);
}