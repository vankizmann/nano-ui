import Info from './src/info/info';
import InfoColumn from './src/info-column/info-column';
import InfoFieldString from './src/info-field/types/info-field-string';
import InfoFieldBoolean from './src/info-field/types/info-field-boolean';
import InfoFieldDatetime from './src/info-field/types/info-field-datetime';
import InfoFieldOption from './src/info-field/types/info-field-option';
import InfoFieldImage from './src/info-field/types/info-field-image';

export default function (App) {
    App.component(Info.name, Info);
    App.component(InfoColumn.name, InfoColumn);
    App.component(InfoFieldString.name, InfoFieldString);
    App.component(InfoFieldBoolean.name, InfoFieldBoolean);
    App.component(InfoFieldDatetime.name, InfoFieldDatetime);
    App.component(InfoFieldOption.name, InfoFieldOption);
    App.component(InfoFieldImage.name, InfoFieldImage);
}