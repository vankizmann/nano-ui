import { App } from "vue";
import NDraglist from "./js/draglist/NDraglist.ts";
import NDropzone from "./js/dropzone/NDropzone.ts";

export default function (App:App) {
    App.component(NDraglist.name, NDraglist);
    App.component(NDropzone.name, NDropzone);
}

import { NDragHandler } from "./js/drag/NDragHandler.ts";
import { NDragCounter } from "./js/drag/NDragCounter.ts";
import { NDragIndicator } from "./js/drag/NDragIndicator.ts";
import { NDragReciever } from "./js/drag/NDragReciever.ts";

export {
    NDragHandler,
    NDragCounter,
    NDragIndicator,
    NDragReciever,
};
