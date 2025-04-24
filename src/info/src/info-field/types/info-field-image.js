import InfoField from "../info-field";
import { Obj } from "@kizmann/pico-js";

export default {

    name: 'NInfoFieldImage',

    extends: InfoField,

    computed: {

        preview()
        {
            return Obj.get(this.item, this.column.previewProp);
        }

    },

    render()
    {
        if ( this.column.cslo('default', this) ) {
            return (
                <div>{ this.column.$slots.default(this) }</div>
            );
        }

        let props = {
            fit: 'contain',
        };

        return (
            <div>
                <NPreview file={this.preview || this.input} thumb={this.input} {...props} />
            </div>
        );
    }

}
