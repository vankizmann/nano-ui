import NConfig from "./src/config/config";
import NConfigNext from "./src/config/config-next";

export default function(App) {
    App.component(NConfig.name, NConfig);
    App.component(NConfigNext.name, NConfigNext);
}
