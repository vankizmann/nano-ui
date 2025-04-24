import Tabs from './src/tabs/tabs';
import TabsItem from './src/tabs-item/tabs-item';

export default function (App) {
    App.component(Tabs.name, Tabs);
    App.component(TabsItem.name, TabsItem);
}