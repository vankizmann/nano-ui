import Map from "./src/map/map.ts";
import MapMarker from "./src/map-marker/map-marker.ts";

export default function (App) {
    App.component(Map.name, Map);
    App.component(MapMarker.name, MapMarker);
}

