import NRadio from './src/radio/radio';
import NRadioGroup from './src/radio-group/radio-group';

export default function (App) {
    App.component(NRadio.name, NRadio);
    App.component(NRadioGroup.name, NRadioGroup);
}
