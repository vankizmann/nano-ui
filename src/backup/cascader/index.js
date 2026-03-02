import CascaderPanel from "./src/cascader-panel/cascader-panel.ts";
import Cascader from "./src/cascader/cascader.ts";

export default function (App) {
    App.component(CascaderPanel.name, CascaderPanel);
    App.component(Cascader.name, Cascader);
}