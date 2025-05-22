import { Arr, Obj, Any, Dom, UUID, Locale } from "@kizmann/pico-js";

export default {

    name: 'NFormMenu',

    inject: {

        NForm: {
            default: undefined
        },

    },

    props: {

        size: {
            default()
            {
                return '';
            },
            type: [String]
        },

    },

    mounted()
    {

        Dom.find(document).on('scroll', Any.debounce(() => {

            let loop = true;

            Arr.each(this.NForm.groups, (item) => {
                loop = loop && ! this.bindInviewEvent(item);
            })
        }));
    },

    methods: {

        bindInviewEvent(item)
        {
            let [menu, group] = [
                `[data-menu-key="${item.key}"]`,
                `[data-group-key="${item.key}"]`
            ];

            let inview = Dom.find(group).inviewY(0.1);

            Dom.find('[data-menu-key]')
                .removeClass('is-visible');

            if ( inview ) {
                Dom.find(menu).addClass('is-visible');
            }

            return inview;
        }

    },

    renderMenu(item)
    {
        return (
           <div data-menu-key={item.key}>
               <a href={'#' + item.key}>{item.label}</a>
           </div>
        );
    },

    renderMenus()
    {
        return Arr.each(this.NForm.groups, (item) => {
            return this.ctor('renderMenu')(item);
        })
    },

    render()
    {
        let classList = [
            'n-form-menu'
        ];

        return <div class={classList}>
            {this.ctor('renderMenus')()}
        </div>;
    }
}
