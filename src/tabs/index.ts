import { App } from "vue";
import NTabs from "./js/tabs/NTabs.ts";
import NTabsItem from "./js/tabs-item/NTabsItem.ts";

export default function (App : App) {
    App.component(NTabs.name, NTabs);
    App.component(NTabsItem.name, NTabsItem);
}
