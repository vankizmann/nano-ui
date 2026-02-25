import NCascader from "./js/cascader/NCascader.js";
import NCascaderPanel from "./js/cascader-panel/NCascaderPanel.js";

export default function (App) {
    App.component(NCascader.name, NCascader);
    App.component(NCascaderPanel.name, NCascaderPanel);
}