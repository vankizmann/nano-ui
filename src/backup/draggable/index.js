import Draglist from "./src/draglist/draglist.ts";
import DraglistItem from "./src/draglist-item/draglist-item.ts";
import Draggrid from "./src/draggrid/draggrid.ts";
import DraggridItem from "./src/draggrid-item/draggrid-item.ts";
import Dropzone from "./src/dropzone/dropzone.ts";

export default function (App) {
    App.component(Draglist.name, Draglist);
    App.component(DraglistItem.name, DraglistItem);
    App.component(Draggrid.name, Draggrid);
    App.component(DraggridItem.name, DraggridItem);
    App.component(Dropzone.name, Dropzone);
}