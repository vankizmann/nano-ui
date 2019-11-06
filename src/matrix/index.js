import Vue from "vue";

import Matrix from './src/matrix/matrix';
Vue.component(Matrix.name, Matrix);

import MatrixColumn from './src/matrix-column/matrix-column';
Vue.component(MatrixColumn.name, MatrixColumn);
