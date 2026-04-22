import { h } from "vue";

export const NPreviewFileModule = ({ scope, full }) => {
    return scope.view.meta(full);
};

export default NPreviewFileModule;