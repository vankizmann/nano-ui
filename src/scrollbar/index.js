import NScrollbar from "./js/scrollbar/NScrollbar.js";
import NVirtualbar from "./js/virtualbar/NVirtualbar.js";

export default function (App) {
    App.component(NScrollbar.name, NScrollbar);
    App.component(NVirtualbar.name, NVirtualbar);
}