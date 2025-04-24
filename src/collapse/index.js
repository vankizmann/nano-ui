import Collapse from './src/collapse/collapse';
import CollapseItem from './src/collapse-item/collapse-item';

export default function (App) {
    App.component(Collapse.name, Collapse);
    App.component(CollapseItem.name, CollapseItem);
}