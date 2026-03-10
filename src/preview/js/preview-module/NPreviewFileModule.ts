import { h } from "vue";

export const NPreviewFileModule = ({ scope, full }) => {
    return h('ul', {}, [scope.view.meta(full)]);
};

export default NPreviewFileModule;