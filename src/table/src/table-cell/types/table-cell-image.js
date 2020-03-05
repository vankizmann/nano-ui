import TableCell from "../table-cell";

export default {

    name: 'NTableCellImage',

    extends: TableCell,

    render()
    {
        let classList = [
            'n-table-cell',
            'n-table-cell--' + this.column.type
        ];

        return (
            <div class={classList}>
                <div style={'background-image: url(\'' + this.input + '\');'} />
            </div>
        );
    }

}
