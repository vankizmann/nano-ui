import Draglist from './src/draglist/draglist';
import DraglistItem from './src/draglist-item/draglist-item';
import Draggrid from './src/draggrid/draggrid';
import DraggridItem from './src/draggrid-item/draggrid-item';

export default function (App) {
    App.component(Draglist.name, Draglist);
    App.component(DraglistItem.name, DraglistItem);
    // App.component(Draggrid.name, Draggrid);
    // App.component(DraggridItem.name, DraggridItem);
}