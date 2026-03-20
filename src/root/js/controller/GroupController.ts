import { Arr } from "@kizmann/pico-js";
import { ProtoController } from "../../index.ts";
import { onUnmounted, ref } from "vue";


export class GroupController extends ProtoController
{
    /**
     * @type {any}
     */
    _childs : any = [];

    /**
     * @type {any}
     */
    _child_events : any = [];

    get childs() : any
    {
        return this._childs?.value ?? [];
    }

    set childs(value : any)
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

    watchChilds(cb : Function)
    {
        this._child_events.push(cb);
    }

    append(child : any)
    {
        Arr.append(this._childs.value, child);

        Arr.each(this._child_events, (cb : Function) => {
            cb();
        });

        return this;
    }

    remove(child : any)
    {
        const childs = this._childs.value;

        const indexies : any[] = Arr.filterIndex(childs, (c : any) => {
            return c.uid === child.uid;
        });

        Arr.splices(this._childs.value, indexies);

        Arr.each(this._child_events, (cb : Function) => {
            cb();
        });

        return this;
    }

}

export default GroupController;