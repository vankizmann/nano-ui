import TableCell from "../table-cell";
import { Obj, Any } from "@kizmann/pico-js";

export default {

    name: 'NTableCellImage',

    extends: TableCell,

    computed: {

        preview()
        {
            return Obj.get(this.item, this.column.previewProp);
        }

    },

    render()
    {
        if ( ! this.init ) {
            return null;
        }

        if ( this.column.cslo('default', this) ) {
            return (
                <div>{ this.column.$slots.default(this) }</div> 
            );
        }

        let classList = [
            'n-table-cell',
            'n-table-cell--' + this.column.type
        ];

        let props = {
            fit: 'contain',
        }

        return (
            <div class={classList}>
                <NPreview file={this.preview || this.input} thumb={this.input} {...props} />
            </div>
        );
    }

}
