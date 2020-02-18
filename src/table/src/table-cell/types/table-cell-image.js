import TableCell from "../table-cell";

export default {

    name: 'NTableCellImage',

    extends: TableCell,

    render()
    {
        let className = [
            'n-table-cell', 'n-table-cell--' + this.column.type
        ];

        return <div class={className}>
            <span style={'background-image: url(\'' + this.input + '\');'} />
        </div>;
    }

}
