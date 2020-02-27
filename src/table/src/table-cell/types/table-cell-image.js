import TableCell from "../table-cell";

export default {

    name: 'NTableCellImage',

    extends: TableCell,

    render()
    {
        let classList = [
            'n-table-cell', 'n-table-cell--' + this.column.type
        ];

        return (
            <div class={classList} style={'background-image: url(\'' + this.input + '\');'}>
                { /* No content :) */ }
            </div>
        );
    }

}
