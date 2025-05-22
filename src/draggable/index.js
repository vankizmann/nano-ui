import Draglist from "./src/draglist/draglist.jsx";
import DraglistItem from "./src/draglist-item/draglist-item.jsx";
import Draggrid from "./src/draggrid/draggrid.jsx";
import DraggridItem from "./src/draggrid-item/draggrid-item.jsx";
import Dropzone from "./src/dropzone/dropzone.jsx";

export default function (App) {
    App.component(Draglist.name, Draglist);
    App.component(DraglistItem.name, DraglistItem);
    App.component(Draggrid.name, Draggrid);
    App.component(DraggridItem.name, DraggridItem);
    App.component(Dropzone.name, Dropzone);
}