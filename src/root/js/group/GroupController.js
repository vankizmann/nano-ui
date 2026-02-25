import { Arr } from "@kizmann/pico-js";
import { ProtoController } from "../../index.js";
import { onBeforeUnmount, onUnmounted, ref, watch } from "vue";


/**
 * @class GroupController
 * @template T, P, V
 * @extends {ProtoController<T, P, V>}
 */
export class GroupController extends ProtoController
{
    _childs = [];
    _child_events = [];

    get childs()
    {
        return this._childs.value;
    }

    set childs(value)
    {
        this._childs.value = value;
    }

    setup()
    {
        super.setup();

        this._childs = ref([]);

        onUnmounted(() => {
            this._childs = null;
        });

        return this;
    }

    watchChilds(cb)
    {
        this._child_events.push(cb);
    }

    append(child)
    {
        Arr.append(this._childs.value, child);

        Arr.each(this._child_events, (cb) => {
            cb();
        });

        return this;
    }

    remove(child)
    {
        const childs = this._childs.value;

        const indexies = Arr.filterIndex(childs, (c) => {
            return c.uid === child.uid;
        });

        Arr.splices(this._childs.value, indexies);

        Arr.each(this._child_events, (cb) => {
            cb();
        });

        return this;
    }

}

export default GroupController;