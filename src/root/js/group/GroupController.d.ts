/**
 * @class GroupController
 * @template T, P, V
 * @extends {ProtoController<T, P, V>}
 */
export class GroupController<T, P, V> extends ProtoController<T, P, V, any> {
    constructor(props: any, context: any);
    _childs: any[];
    _child_events: any[];
    set childs(value: any);
    get childs(): any;
    setup(): this;
    watchChilds(cb: any): void;
    append(child: any): this;
    remove(child: any): this;
}
export default GroupController;
import { ProtoController } from "../../index.js";
