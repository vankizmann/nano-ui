import ChartItem from "./src/chart-item/chart-item.jsx";
import ChartDonut from "./src/chart-donut/chart-donut.jsx";
import ChartBar from "./src/chart-bar/chart-bar.jsx";

export default function (App) {
    App.component(ChartItem.name, ChartItem);
    App.component(ChartDonut.name, ChartDonut);
    App.component(ChartBar.name, ChartBar);
}