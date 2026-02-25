import NDraglist from "./js/draglist/NDraglist.js";

export default function (App) {
    App.component(NDraglist.name, NDraglist);
}

import { NDraglistProps } from "./js/draglist/NDraglist.js";
import { NDraglistData } from "./js/draglist/NDraglistData.js";
import { NDragHandler } from "./js/drag/NDragHandler.js";
import { NDragCounter } from "./js/drag/NDragCounter.js";
import { NDragIndicator } from "./js/drag/NDragIndicator.js";
import { NDragReciever } from "./js/drag/NDragReciever.js";

export {
    NDraglistProps,
    NDraglistData,
    NDragHandler,
    NDragCounter,
    NDragIndicator,
    NDragReciever,
};
