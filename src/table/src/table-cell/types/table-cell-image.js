import TableCell from "../table-cell";
import { Obj, Any } from "@kizmann/pico-js";

export default {

    name: 'NTableCellImage',

    extends: TableCell,

    computed: {

        preview()
        {
            return Obj.get(this.value, this.column.previewProp);
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

        if ( this.preview ) {
            classList.push('has-preview');
        }

        return (
            <div class={classList}>
                <NPreview file={this.preview || this.input} thumb={this.input} />
            </div>
        );
    }

}
