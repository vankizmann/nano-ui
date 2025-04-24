
var GenerateItems = function (count, loop) {
    return pi.Arr.each(pi.Arr.make(count), (index) => {

        var item = {
            id: 'item-' + pi.UUID(), label: 'Item ' + index, image: 'https://picsum.photos/260/160.jpg?' + pi.UUID(), date: new Date,
        }

        if ( loop > 1 ) {
            item.children = GenerateItems(10, loop-1)
        }

        return item;
    });
};

let DemoPlugin = function (hook, vm) {

    // Global vue data
    window.VueData = window.DefaultVueData = {
        itemsMini: GenerateItems(50, 1),
        itemsMidi: GenerateItems(500, 1),
        itemsMaxi: GenerateItems(1000, 2),
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

        pi.Dom.find('#temp-script').each(function (el) {
            el.remove();
        });

        if ( ! pi.Any.isEmpty(window.VueData) ) {
            window.VueData = pi.Obj.assign({}, window.DefaultVueData);
        }

        if ( ! pi.Any.isEmpty(window.VueRemote) ) {
            window.VueRemote.unmount();
        }

        let pattern = /```js\s\[demo]([^`]*)```/gm;

        let globaljs = pi.Arr.each(markdown.match(pattern) || [], (text) => {
            return text.replace(pattern, "$1");
        });

        pi.Dom.make('script', { id: "temp-script", innerHTML: globaljs.join("\n")})
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
                return window.VueData;
            }
        };

        // Create vue instance
        window.VueRemote = window.Vue
            .createApp(options);

        window.VueRemote
            .use(window.nano.Install);

        window.VueRemote.mount('#main');
    });

    console.log('DemoPlugin done!');
}

let options = {
    name: 'nano.ui', loadSidebar: true, search: 'auto',  depth: 1, subMaxLevel: 1, topMargin: 90
};

let PagetitlePlugin = function(hook, vm) {
    hook.doneEach(function() {
        document.title += ' | nano.ui';
    });
}

options.plugins = [
    DemoPlugin, PagetitlePlugin
];

if ( pi.Any.isEmpty(options) ) {
    options.repo = 'https://github.com/vankizmann/nano-ui'
}

window.$docsify = options;