import { App } from "vue";
import NDatepicker from "./js/datepicker/NDatepicker.ts";
import NDatepickerPanel from "./js/datepicker-panel/NDatepickerPanel.ts";
import NTimepicker from "./js/timepicker/NTimepicker.ts";
import NTimepickerPanel from "./js/timepicker-panel/NTimepickerPanel.ts";

export default function (App:App) {
    App.component(NDatepicker.name, NDatepicker);
    App.component(NDatepickerPanel.name, NDatepickerPanel);
    App.component(NTimepicker.name, NTimepicker);
    App.component(NTimepickerPanel.name, NTimepickerPanel);
}