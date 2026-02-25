import Resizer from "./src/resizer/resizer.jsx";
import ResizerNext from "./src/resizer/resizer-next.jsx";

export default function (App) {
    // App.component(Resizer.name, Resizer);
    App.component(ResizerNext.name, ResizerNext);
}
