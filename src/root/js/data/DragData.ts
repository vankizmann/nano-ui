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
     * @returns {object}
     */
    get current() : object
    {
        return this.scope.get('current');
    }

    /**
     * @returns {any[]}
     */
    get selected() : any[]
    {
        return this.scope.get('selected');
    }

    /**
     * @returns {any[]}
     */
    get expanded() : any[]
    {
        return this.scope.get('expanded');
    }

    /**
     * @returns {any[]}
     */
    get cascade() : any[]
    {
        return this.scope.get('cascade');
    }

    /**
     * @returns {any[]}
     */
    get group() : any[]
    {
        return this.scope.get('group');
    }

    /**
     * @returns {any[]}
     */
    get allowGroups() : any[]
    {
        return this.scope.get('allowGroups');
    }

    /**
     * @returns {function}
     */
    get safezone() : Function
    {
        return this.scope.get('safezone');
    }

    /**
     * @returns {boolean}
     */
    get allowCurrent() : boolean
    {
        return this.scope.get('allowCurrent');
    }

    /**
     * @returns {boolean}
     */
    get renderHandle() : boolean
    {
        return this.scope.get('renderHandle');
    }

    /**
     * @returns {boolean}
     */
    get renderExpand() : boolean
    {
        return this.scope.get('renderExpand');
    }

    /**
     * @returns {boolean}
     */
    get renderSelect() : boolean
    {
        return this.scope.get('renderSelect');
    }

    /**
     * @returns {boolean|function}
     */
    get allowSelect() : boolean | Function
    {
        return this.scope.get('allowSelect');
    }

    /**
     * @returns {boolean|function}
     */
    get allowDrag() : boolean | Function
    {
        return this.scope.get('allowDrag');
    }

    /**
     * @returns {boolean|function}
     */
    get allowDrop() : boolean | Function
    {
        return this.scope.get('allowDrop');
    }

    /**
     * @returns {function}
     */
    get transformDrop() : Function
    {
        return this.scope.get('transformDrop');
    }

    /**
     * @returns {boolean}
     */
    get insertNode() : boolean
    {
        return this.scope.get('insertNode');
    }

    /**
     * @returns {boolean}
     */
    get removeNode() : boolean
    {
        return this.scope.get('removeNode');
    }

    /**
     * @returns {string}
     */
    get uniqueProp() : string
    {
        return this.scope.get('uniqueProp');
    }

    /**
     * @returns {string}
     */
    get childProp() : string
    {
        return this.scope.get('childProp');
    }

    /**
     * @returns {number}
     */
    get itemHeight() : number
    {
        return this.scope.get('itemHeight');
    }

    /**
     * @returns {number}
     */
    get itemWidth() : number
    {
        return this.scope.get('itemWidth');
    }

    /**
     * @returns {number}
     */
    get itemOffset() : number
    {
        return this.scope.get('itemOffset');
    }

    /**
     * @returns {boolean}
     */
    get itemSkip() : boolean
    {
        return this.scope.get('itemSkip');
    }

    /**
     * @returns {boolean}
     */
    get rootSkip() : boolean
    {
        return this.scope.get('rootSkip');
    }

}

export default DragData;