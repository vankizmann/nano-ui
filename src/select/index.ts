import { App } from "vue";
import NSelect from "./js/select/NSelect.ts";

export default function (App:App) {
    App.component(NSelect.name, NSelect);
}