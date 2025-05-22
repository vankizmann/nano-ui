import NConfig from "./src/config/config.jsx";
import NConfigNext from "./src/config/config-next.jsx";
import NBuilder from "./src/builder/builder.jsx";
import NRefrencePanel from "./src/reference-panel/reference-panel.jsx";
import NRefrencePicker from "./src/reference-picker/reference-picker.jsx";

export default function(App) {
    App.component(NConfig.name, NConfig);
    App.component(NConfigNext.name, NConfigNext);
    App.component(NBuilder.name, NBuilder);
    App.component(NRefrencePanel.name, NRefrencePanel);
    App.component(NRefrencePicker.name, NRefrencePicker);
}
