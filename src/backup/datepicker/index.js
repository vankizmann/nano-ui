import DatepickerPanel from "./src/datepicker-panel/datepicker-panel.ts";
import Datepicker from "./src/datepicker/datepicker.ts";

export default function (App) {
    App.component(DatepickerPanel.name, DatepickerPanel);
    App.component(Datepicker.name, Datepicker);
}