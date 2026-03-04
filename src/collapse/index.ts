import { App } from "vue";
import NCollapse from "./js/collapse/NCollapse.ts";
import NCollapseItem from "./js/collapse-item/NCollapseItem.ts";

export default function (App : App) {
    App.component(NCollapse.name, NCollapse);
    App.component(NCollapseItem.name, NCollapseItem);
}
