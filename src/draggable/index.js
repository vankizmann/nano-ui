import Vue from "vue";

import Draggable from './src/draggable/draggable';
Vue.component(Draggable.name, Draggable);

import DraggableTree from './src/draggable-tree/draggable-tree';
Vue.component(DraggableTree.name, DraggableTree);

import DraggableTreeItem from './src/draggable-tree-item/draggable-tree-item';
Vue.component(DraggableTreeItem.name, DraggableTreeItem);
