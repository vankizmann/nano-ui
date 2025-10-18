import Scrollbar from "./src/scrollbar/scrollbar.jsx";
import ScrollbarNext from "./src/scrollbar-next/scrollbar-next.jsx";

export default function (App) {
    // App.component(Scrollbar.name, Scrollbar);
    App.component(ScrollbarNext.name, ScrollbarNext);
}