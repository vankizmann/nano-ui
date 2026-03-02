import Resizer from "./src/resizer/resizer.ts";
import ResizerNext from "./src/resizer/resizer-next.ts";

export default function (App) {
    // App.component(Resizer.name, Resizer);
    App.component(ResizerNext.name, ResizerNext);
}
