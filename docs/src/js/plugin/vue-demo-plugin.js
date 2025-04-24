import { Dom, Obj, Arr, Any } from '@kizmann/pico-js';
import { Install as NanoInstall } from '../../../../src/index.js';

export const VueDemoPlugin = function (hook, vm) {

    // Global vue data
    window.VueData = window.DefaultVueData = {
        // itemsMini: GenerateItems(50, 1),
        // itemsMidi: GenerateItems(500, 1),
        // itemsMaxi: GenerateItems(1000, 2),
    };

    window.DefaultVueData.types = {
        'primary': 'Primary',
        'secondary': 'Secondary',
        'success': 'Success',
        'warning': 'Warning',
        'danger': 'Danger',
        'info': 'Info',
    };

    window.DefaultVueData.sizes = {
        'xs': 'Mini',
        'sm': 'Small',
        'md': 'Medium',
        'lg': 'Large'
    };

    window.DefaultVueData.icons = {
        'fa fa-search': 'Search',
        'fa fa-star': 'Star',
        'fa fa-check': 'Check',
        'fa fa-trash': 'Trash'
    },

        // Remote vue app
        window.VueRemote = null;

    hook.beforeEach(function (markdown) {

        Dom.find('#temp-script').each(function (el) {
            el.remove();
        });

        if ( ! Any.isEmpty(window.VueData) ) {
            window.VueData = Obj.assign({}, window.DefaultVueData);
        }

        if ( ! Any.isEmpty(window.VueRemote) ) {
            window.VueRemote.unmount();
        }

        let pattern = /```js\s\[demo]([^`]*)```/gm;

        let globaljs = Arr.each(markdown.match(pattern) || [], (text) => {
            return text.replace(pattern, "$1");
        });

        Dom.make('script', { id: "temp-script", innerHTML: globaljs.join("\n")})
            .appendTo(document.body)

        markdown = markdown.replace(/```html\s\[demo]([^`]*)```/gm,
            '<div class="demo-wrapper">$1</div>');

        return markdown.replace(/```[a-z]+\s\[demo][^`]*```/gm, '');
    });

    hook.afterEach(function (html) {

        html = html.replace(/<code>(Mixed|Any|String|Boolean|Array|Object)<\/code>/gm,
            '<code data-type="$1">$1</code>');

        return '<div id="vue-remote">' + html + '</div>';
    });

    hook.doneEach(function () {

        let options = {
            data: function () {
                return Obj.clone(window.VueData);
            }
        };

        // Create vue instance
        window.VueRemote = window.Vue.createApp(options);

        window.VueRemote.use((app) => {
            NanoInstall(app)
        });

        window.VueRemote.mount('#main');
    });

    console.log('DemoPlugin done!');
}

export default VueDemoPlugin;