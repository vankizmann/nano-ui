import Collapse from "./src/collapse/collapse.jsx";
import CollapseItem from "./src/collapse-item/collapse-item.jsx";

export default function (App) {
    App.component(Collapse.name, Collapse);
    App.component(CollapseItem.name, CollapseItem);
}