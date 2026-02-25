import DatepickerPanel from "./src/datepicker-panel/datepicker-panel.jsx";
import Datepicker from "./src/datepicker/datepicker.jsx";

export default function (App) {
    App.component(DatepickerPanel.name, DatepickerPanel);
    App.component(Datepicker.name, Datepicker);
}