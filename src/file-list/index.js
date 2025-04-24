import Vue from "vue";

import FileList from './src/file-list/file-list';
Vue.component(FileList.name, FileList);

import FileListItem from './src/file-list-item/file-list-item';
Vue.component(FileListItem.name, FileListItem);

import FileListItemImage from './src/file-list-item/types/file-list-item-image';
Vue.component(FileListItemImage.name, FileListItemImage);
