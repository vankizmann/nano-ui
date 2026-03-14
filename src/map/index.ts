import { App } from "vue";
import NMap from "./js/map/NMap.ts";
import NMapMarker from "./js/map-marker/NMapMarker.ts";

export default function (App : App) {
    App.component(NMap.name, NMap);
    App.component(NMapMarker.name, NMapMarker);
}