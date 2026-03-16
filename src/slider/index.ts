import { App } from "vue";
import NSlider from "./js/slider/NSlider.ts";

export default function (App : App) {
    App.component(NSlider.name, NSlider);
}