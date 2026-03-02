import { App } from "vue";
import NModal from "./js/modal/NModal.ts";
import NDrawer from "./js/drawer/NDrawer.ts";

export default function (App : App) {
    App.component(NModal.name, NModal);
    App.component(NDrawer.name, NDrawer);
}
