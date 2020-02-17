import Vue from "vue";

import Draggable from './src/draggable/draggable.beta';
Vue.component(Draggable.name, Draggable);

import DraggableItem from './src/draggable-item/draggable-item';
Vue.component(DraggableItem.name, DraggableItem);

import DraggableTree from './src/draggable-tree/draggable-tree';
Vue.component(DraggableTree.name, DraggableTree);

import DraggableTreeItem from './src/draggable-tree-item/draggable-tree-item';
Vue.component(DraggableTreeItem.name, DraggableTreeItem);
