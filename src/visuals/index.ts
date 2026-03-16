import { App } from "vue";
import NTag from "./js/tag/NTag.ts";
import NRating from "./js/rating/NRating.ts";

export default function (App : App) {
    App.component(NTag.name, NTag);
    App.component(NRating.name, NRating);
}