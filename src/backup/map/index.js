import Map from "./src/map/map.jsx";
import MapMarker from "./src/map-marker/map-marker.jsx";

export default function (App) {
    App.component(Map.name, Map);
    App.component(MapMarker.name, MapMarker);
}

