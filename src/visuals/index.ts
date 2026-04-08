import { App } from "vue";
import NTag from "./js/tag/NTag.ts";
import NRating from "./js/rating/NRating.ts";
import NMessage from "./js/message/NMessage.ts";

export default function (App : App) {
    App.component(NTag.name, NTag);
    App.component(NRating.name, NRating);
    App.component(NMessage.name, NMessage);
}