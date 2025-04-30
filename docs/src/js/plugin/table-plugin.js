export const TablePlugin = function(hook, vm) {
    hook.afterEach(function (html) {

        html = html.replace(/<table>/gm, '<div class="markdown-table"><table>');
        html = html.replace(/<\/table>/gm, '</table></div>');

        return html;
    });
};

export default TablePlugin;