import { ProtoController } from "../../index.ts";

export class DragData
{
    /**
     * @type {ProtoController}
     */
    declare scope : ProtoController;

    /**
     * @returns {any[]}
     */
    get items() : any[]
    {
        return this.scope.get('items');
    }

    /**
     * @param {any[]} value
     */
    set items(value : any[])
    {
        this.scope.set('items', value);
    }

    /**
     * @returns {object}
     */
    get current() : object
    {
        return this.scope.get('current');
    }

    /**
     * @param {object} value
     */
    set current(value : object)
    {
        this.scope.set('current', value);
    }

    /**
     * @returns {any[]}
     */
    get selected() : any[]
    {
        return this.scope.get('selected');
    }

    /**
     * @param {any[]} value
     */
    set selected(value : any[])
    {
        this.scope.set('selected', value);
    }

    /**
     * @returns {any[]}
     */
    get expanded() : any[]
    {
        return this.scope.get('expanded');
    }

    /**
     * @param {any[]} value
     */
    set expanded(value : any[])
    {
        this.scope.set('expanded', value);
    }

    /**
     * @returns {any[]}
     */
    get group() : any[]
    {
        return this.scope.get('group');
    }

    /**
     * @param {any[]} value
     */
    set group(value : any[])
    {
        this.scope.set('group', value);
    }

    /**
     * @returns {any[]}
     */
    get allowGroups() : any[]
    {
        return this.scope.get('allowGroups');
    }

    /**
     * @param {any[]} value
     */
    set allowGroups(value : any[])
    {
        this.scope.set('allowGroups', value);
    }

    /**
     * @returns {function}
     */
    get safezone() : Function
    {
        return this.scope.get('safezone');
    }

    /**
     * @param {function} value
     */
    set safezone(value : Function)
    {
        this.scope.set('safezone', value);
    }

    /**
     * @returns {boolean}
     */
    get renderHandle() : boolean
    {
        return this.scope.get('renderHandle');
    }

    /**
     * @param {boolean} value
     */
    set renderHandle(value : boolean)
    {
        this.scope.set('renderHandle', value);
    }

    /**
     * @returns {boolean}
     */
    get renderExpand() : boolean
    {
        return this.scope.get('renderExpand');
    }

    /**
     * @param {boolean} value
     */
    set renderExpand(value : boolean)
    {
        this.scope.set('renderExpand', value);
    }

    /**
     * @returns {boolean}
     */
    get renderSelect() : boolean
    {
        return this.scope.get('renderSelect');
    }

    /**
     * @param {boolean} value
     */
    set renderSelect(value : boolean)
    {
        this.scope.set('renderSelect', value);
    }

    /**
     * @returns {boolean|function}
     */
    get allowSelect() : boolean | Function
    {
        return this.scope.get('allowSelect');
    }

    /**
     * @param {boolean|function} value
     */
    set allowSelect(value : boolean | Function)
    {
        this.scope.set('allowSelect', value);
    }

    /**
     * @returns {boolean|function}
     */
    get allowDrag() : boolean | Function
    {
        return this.scope.get('allowDrag');
    }

    /**
     * @param {boolean|function} value
     */
    set allowDrag(value : boolean | Function)
    {
        this.scope.set('allowDrag', value);
    }

    /**
     * @returns {boolean|function}
     */
    get allowDrop() : boolean | Function
    {
        return this.scope.get('allowDrop');
    }

    /**
     * @param {boolean|function} value
     */
    set allowDrop(value : boolean | Function)
    {
        this.scope.set('allowDrop', value);
    }

    /**
     * @returns {function}
     */
    get transformDrop() : Function
    {
        return this.scope.get('transformDrop');
    }

    /**
     * @param {function} value
     */
    set transformDrop(value : Function)
    {
        this.scope.set('transformDrop', value);
    }

    /**
     * @returns {boolean}
     */
    get insertNode() : boolean
    {
        return this.scope.get('insertNode');
    }

    /**
     * @param {boolean} value
     */
    set insertNode(value : boolean)
    {
        this.scope.set('insertNode', value);
    }

    /**
     * @returns {boolean}
     */
    get removeNode() : boolean
    {
        return this.scope.get('removeNode');
    }

    /**
     * @param {boolean} value
     */
    set removeNode(value : boolean)
    {
        this.scope.set('removeNode', value);
    }

    /**
     * @returns {string}
     */
    get uniqueProp() : string
    {
        return this.scope.get('uniqueProp');
    }

    /**
     * @param {string} value
     */
    set uniqueProp(value : string)
    {
        this.scope.set('uniqueProp', value);
    }

    /**
     * @returns {string}
     */
    get childProp() : string
    {
        return this.scope.get('childProp');
    }

    /**
     * @param {string} value
     */
    set childProp(value : string)
    {
        this.scope.set('childProp', value);
    }

    /**
     * @returns {number}
     */
    get itemHeight() : number
    {
        return this.scope.get('itemHeight');
    }

    /**
     * @param {number} value
     */
    set itemHeight(value : number)
    {
        this.scope.set('itemHeight', value);
    }

    /**
     * @returns {number}
     */
    get itemOffset() : number
    {
        return this.scope.get('itemOffset');
    }

    /**
     * @param {number} value
     */
    set itemOffset(value : number)
    {
        this.scope.set('itemOffset', value);
    }

    /**
     * @returns {boolean}
     */
    get itemSkip() : boolean
    {
        return this.scope.get('itemSkip');
    }

    /**
     * @param {boolean} value
     */
    set itemSkip(value : boolean)
    {
        this.scope.set('itemSkip', value);
    }

    /**
     * @returns {boolean}
     */
    get rootSkip() : boolean
    {
        return this.scope.get('rootSkip');
    }

    /**
     * @param {boolean} value
     */
    set rootSkip(value : boolean)
    {
        this.scope.set('rootSkip', value);
    }

}

export default DragData;