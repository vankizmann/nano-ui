import Collapse from "./src/collapse/collapse.ts";
import CollapseItem from "./src/collapse-item/collapse-item.ts";

export default function (App) {
    App.component(Collapse.name, Collapse);
    App.component(CollapseItem.name, CollapseItem);
}