export const PagetitlePlugin = function(hook, vm) {
    hook.doneEach(function() {
        document.title += ' | nano.ui';
    });
};

export default PagetitlePlugin;