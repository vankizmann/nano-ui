import Info from "./src/info/info.ts";
import InfoColumn from "./src/info-column/info-column.ts";
import InfoFieldString from "./src/info-field/types/info-field-string.ts";
import InfoFieldBoolean from "./src/info-field/types/info-field-boolean.ts";
import InfoFieldDatetime from "./src/info-field/types/info-field-datetime.ts";
import InfoFieldOption from "./src/info-field/types/info-field-option.ts";
import InfoFieldImage from "./src/info-field/types/info-field-image.ts";

export default function (App) {
    App.component(Info.name, Info);
    App.component(InfoColumn.name, InfoColumn);
    App.component(InfoFieldString.name, InfoFieldString);
    App.component(InfoFieldBoolean.name, InfoFieldBoolean);
    App.component(InfoFieldDatetime.name, InfoFieldDatetime);
    App.component(InfoFieldOption.name, InfoFieldOption);
    App.component(InfoFieldImage.name, InfoFieldImage);
}