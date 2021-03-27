import { Obj, Locale } from "@kizmann/pico-js";

export default {

    name: 'NPreviewPlain',

    props: {

        src: {
            default()
            {
                return null;
            }
        },

        type: {
            default()
            {
                return null;
            }
        },

        showSrc: {
            default()
            {
                return true;
            }
        }

    },

    computed: {

        tempSrc()
        {
            return Obj.get(this.src, 'name', this.src);
        },

        tempExt()
        {
            return this.tempSrc.replace(/^.*?\.([^.?]+)(\?.*?)?$/, '$1');
        }

    },

    render()
    {
        let classList = [
            'n-preview-plain'
        ];

        let slots = [];

        slots[0] = (
            <li>{ this.type || Locale.trans('plain') }/{ this.tempExt || Locale.trans('none') }</li>
        );

        if ( this.showSrc ) {
            slots[1] = (<li>{ this.tempSrc }</li>);
        }

        return (
            <div class={classList}>
                <ul>
                    { slots }
                </ul>
            </div>
        );
    }

}