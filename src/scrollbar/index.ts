import { App } from "vue";
import NScrollbar from "./js/scrollbar/NScrollbar.ts";
import NVirtualbar from "./js/virtualbar/NVirtualbar.ts";

export default function (App : App) {
    App.component(NScrollbar.name, NScrollbar);
    App.component(NVirtualbar.name, NVirtualbar);
}