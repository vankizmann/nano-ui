import { App } from "vue";
import NChartBar from "./js/chart-bar/NChartBar.ts";
import NChartItem from "./js/chart-item/NChartItem.ts";

export default function (App : App) {
    App.component(NChartBar.name, NChartBar);
    App.component(NChartItem.name, NChartItem);
}