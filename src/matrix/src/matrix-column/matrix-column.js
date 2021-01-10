import { Num, Arr } from "nano-js";
import CtorMixin from "../../../mixins/src/ctor";

export default {

    name: 'NMatrixColumn',

    inject: {

        NMatrix: {
            default: undefined
        }

    },

    props: {

        value: {
            default()
            {
                return -1;
            }
        },

        disabled: {
            default()
            {
                return false;
            }
        },

        label: {
            default()
            {
                return null;
            }
        }

    },

    methods: {

        ...CtorMixin

    },

    mounted()
    {
        this.NMatrix.addColumn(this);
    },

    renderLabel(props)
    {
        if ( this.$scopedSlots.label ) {
            return this.$scopedSlots.label;
        }

        return (
            <span>{ this.label }</span>
        );
    },

    renderBody(props)
    {
        if ( this.$scopedSlots.default ) {
            return this.$scopedSlots.default;
        }

        let key = Arr.findIndex(this.NMatrix.columns, {
            _uid: this.uid
        });

        let value = Num.int(this.value) || Math.pow(2, key);

        let events = {
            input: () => this.NMatrix.changeRow(props.row, value)
        };

        let disabled = typeof this.disabled === 'function' ?
            this.disabled : () => this.disabled;

        return (
            <NCheckbox checked={this.NMatrix.isChecked(props.row, value)} disabled={disabled(props.row)} on={events} />
        );
    },

    render(h)
    {
        this.h = h;

        return null;
    }
}
