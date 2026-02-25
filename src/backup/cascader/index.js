import CascaderPanel from "./src/cascader-panel/cascader-panel.jsx";
import Cascader from "./src/cascader/cascader.jsx";

export default function (App) {
    App.component(CascaderPanel.name, CascaderPanel);
    App.component(Cascader.name, Cascader);
}