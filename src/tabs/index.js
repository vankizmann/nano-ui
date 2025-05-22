import Tabs from "./src/tabs/tabs.jsx";
import TabsItem from "./src/tabs-item/tabs-item.jsx";

export default function (App) {
    App.component(Tabs.name, Tabs);
    App.component(TabsItem.name, TabsItem);
}