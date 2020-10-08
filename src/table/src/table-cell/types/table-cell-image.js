import TableCell from "../table-cell";
import { Obj } from "nano-js";

export default {

    name: 'NTableCellImage',

    extends: TableCell,

    computed: {

        preview()
        {
            return Obj.get(this.value, this.column.previewProp);
        }

    },

    renderPreview()
    {
        if ( ! this.preview ) {
            return null;
        }

        return (
            <NModal window={true}>
                {this.preview}
            </NModal>
        )
    },

    render()
    {
        let classList = [
            'n-table-cell',
            'n-table-cell--' + this.column.type
        ];

        return (
            <div class={classList}>
                <div style={'background-image: url(\'' + this.input + '\');'} />
                { this.ctor('renderPreview')() }
            </div>
        );
    }

}
