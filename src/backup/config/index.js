import NConfig from "./src/config/config.ts";
import NConfigNext from "./src/config/config-next.ts";
// import NBuilder from "./src/builder/builder.ts";
// import NRefrencePanel from "./src/reference-panel/reference-panel.ts";
// import NRefrencePicker from "./src/reference-picker/reference-picker.ts";

export default function(App) {
    App.component(NConfig.name, NConfig);
    App.component(NConfigNext.name, NConfigNext);
    // App.component(NBuilder.name, NBuilder);
    // App.component(NRefrencePanel.name, NRefrencePanel);
    // App.component(NRefrencePicker.name, NRefrencePicker);
}
