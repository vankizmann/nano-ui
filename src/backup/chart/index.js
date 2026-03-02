import ChartItem from "./src/chart-item/chart-item.ts";
import ChartDonut from "./src/chart-donut/chart-donut.ts";
import ChartBar from "./src/chart-bar/chart-bar.ts";

export default function (App) {
    App.component(ChartItem.name, ChartItem);
    App.component(ChartDonut.name, ChartDonut);
    App.component(ChartBar.name, ChartBar);
}