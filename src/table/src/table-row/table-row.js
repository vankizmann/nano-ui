import { Any, Arr } from "nano-js";
import NDraggableItem from "../../../draggable/src/draggable-item/draggable-item";

export default {

    name: 'NTableRow',

    extends: NDraggableItem,

    provide()
    {
        return { NTable: this };
    },

    data()
    {
        return { veColumns: [] }
    },

    methods: {

        addColumn(column)
        {
            Arr.add(this.veColumns, column, {
                prop: column.prop
            });
        }

    },

    renderItem(props)
    {
        let data = {
            key: props.value[this.keyProp], props
        };

        return this.$render('NTableRow', data, []);
    },

}