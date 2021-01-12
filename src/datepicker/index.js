import DatepickerPanel from "./src/datepicker-panel/datepicker-panel";
import Datepicker from "./src/datepicker/datepicker";

export default function (App) {
    App.component(DatepickerPanel.name, DatepickerPanel);
    App.component(Datepicker.name, Datepicker);
}