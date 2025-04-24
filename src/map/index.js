import Map from './src/map/map';
import MapMarker from './src/map-marker/map-marker';

export default function (App) {
    App.component(Map.name, Map);
    App.component(MapMarker.name, MapMarker);
}

