import VueDemoPlugin from "../plugin/vue-demo-plugin.js";

let search = {
    namespace: 'nano-ui-docs', maxAge: 86400000, depth: 6
};

let options = {
    name: 'nano.ui', loadSidebar: true, search: 'auto',  depth: 1, subMaxLevel: 3, search
};

options.plugins = [
    VueDemoPlugin
]

window.$docsify = options;