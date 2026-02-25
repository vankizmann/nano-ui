import Info from "./src/info/info.jsx";
import InfoColumn from "./src/info-column/info-column.jsx";
import InfoFieldString from "./src/info-field/types/info-field-string.jsx";
import InfoFieldBoolean from "./src/info-field/types/info-field-boolean.jsx";
import InfoFieldDatetime from "./src/info-field/types/info-field-datetime.jsx";
import InfoFieldOption from "./src/info-field/types/info-field-option.jsx";
import InfoFieldImage from "./src/info-field/types/info-field-image.jsx";

export default function (App) {
    App.component(Info.name, Info);
    App.component(InfoColumn.name, InfoColumn);
    App.component(InfoFieldString.name, InfoFieldString);
    App.component(InfoFieldBoolean.name, InfoFieldBoolean);
    App.component(InfoFieldDatetime.name, InfoFieldDatetime);
    App.component(InfoFieldOption.name, InfoFieldOption);
    App.component(InfoFieldImage.name, InfoFieldImage);
}