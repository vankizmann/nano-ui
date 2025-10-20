import TableCell from "../table-cell.jsx";
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

        let previewProps = {
            fit: 'contain',
            index: this.NDraggableItem.index,
            group: this.column.uid,
        };

        previewProps['onSlide'] = () => {
            this.NTable.$refs.draggable.setRawCurrent(this.NDraggableItem.index);
        };

        return (
            <div class={classList}>
                <NPreview file={this.preview || this.input} thumb={this.input} {...previewProps} />
            </div>
        );
    }

}
