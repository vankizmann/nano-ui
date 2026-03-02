import Tabs from "./src/tabs/tabs.ts";
import TabsItem from "./src/tabs-item/tabs-item.ts";

export default function (App) {
    App.component(Tabs.name, Tabs);
    App.component(TabsItem.name, TabsItem);
}