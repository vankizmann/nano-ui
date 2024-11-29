import NConfig from "./src/config/config";
import NConfigNext from "./src/config/config-next";
import NBuilder from "./src/builder/builder";

export default function(App) {
    App.component(NConfig.name, NConfig);
    App.component(NConfigNext.name, NConfigNext);
    App.component(NBuilder.name, NBuilder);
}
