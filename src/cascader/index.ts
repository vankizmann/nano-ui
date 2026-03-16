import { App } from "vue";
import NCascader from "./js/cascader/NCascader.ts";
import NCascaderPanel from "./js/cascader-panel/NCascaderPanel.ts";

export default function (App:App) {
    App.component(NCascader.name, NCascader);
    App.component(NCascaderPanel.name, NCascaderPanel);
}