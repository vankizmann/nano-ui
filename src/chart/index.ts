import { App } from "vue";
import NChartBar from "./js/chart-bar/NChartBar.ts";
import NChartDonut from "./js/chart-donut/NChartDonut.ts";
import NChartItem from "./js/chart-item/NChartItem.ts";

export default function (App : App) {
    App.component(NChartBar.name, NChartBar);
    App.component(NChartDonut.name, NChartDonut);
    App.component(NChartItem.name, NChartItem);
}