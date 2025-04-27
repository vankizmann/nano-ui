import VueDemoPlugin from "../plugin/vue-demo-plugin.js";
import PagetitlePlugin from "../plugin/title-plugin.js";

let search = {
    namespace: 'nano-ui-docs', maxAge: 86400000, depth: 6
};

let options = {
    name: 'nano.ui', loadSidebar: true, depth: 1, subMaxLevel: 2, search
};

options.plugins = [
    VueDemoPlugin, PagetitlePlugin
];

window.$docsify = options;