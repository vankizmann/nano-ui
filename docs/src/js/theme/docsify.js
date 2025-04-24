import VueDemoPlugin from "../plugin/vue-demo-plugin.js";

let options = {
    name: 'nano.ui', loadSidebar: true, search: 'auto',  depth: 1, subMaxLevel: 1, topMargin: 90
};

options.plugins = [
    VueDemoPlugin
]

window.$docsify = options;