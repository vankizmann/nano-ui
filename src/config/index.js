import NConfig from "./src/config/config";
import NConfigNext from "./src/config/config-next";
import NBuilder from "./src/builder/builder";
import NRefrencePanel from "./src/reference-panel/reference-panel";
import NRefrencePicker from "./src/reference-picker/reference-picker";

export default function(App) {
    App.component(NConfig.name, NConfig);
    App.component(NConfigNext.name, NConfigNext);
    App.component(NBuilder.name, NBuilder);
    App.component(NRefrencePanel.name, NRefrencePanel);
    App.component(NRefrencePicker.name, NRefrencePicker);
}
