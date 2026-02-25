import { ProtoData } from "../../../root/index.js";
import { Arr, Obj } from "@kizmann/pico-js";

/**
 * @class NDraglistData
 * @extends {BaseData<NRadioGroupController>}
 */
export class NDraglistData extends ProtoData
{

    get classList()
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get items()
    {
        return this.scope.get('items');
    }

    get index()
    {
        return this.scope.get('index');
    }

    get current()
    {
        return this.scope.get('current');
    }

    set current(value)
    {
        this.scope.update('current', value);
    }

    get selected()
    {
        return this.scope.get('selected');
    }

    set selected(value)
    {
        this.scope.update('selected', value);
    }

    get expanded()
    {
        return this.scope.get('expanded');
    }

    set expanded(value)
    {
        this.scope.update('expanded', value);
    }

    get virtuals()
    {
        return this.scope.get('virtuals');
    }

    get visibles()
    {
        return this.scope.get('visibles');
    }

    get relation()
    {
        return this.scope.get('relation');
    }

    get group()
    {
        return this.scope.get('group');
    }

    get uniqueProp()
    {
        return this.scope.get('uniqueProp');
    }

    get childProp()
    {
        return this.scope.get('childProp');
    }

    get itemHeight()
    {
        return this.scope.get('itemHeight');
    }

    get itemOffset()
    {
        return this.scope.get('itemOffset');
    }

    get itemSkip()
    {
        return this.scope.get('itemSkip');
    }

    get rootSkip()
    {
        return this.scope.get('rootSkip');
    }

    get transformDrop()
    {
        return this.scope.get('transformDrop');
    }

    get insertNode()
    {
        return this.scope.get('insertNode');
    }

    get removeNode()
    {
        return this.scope.get('removeNode');
    }

    get safezone()
    {
        return this.scope.get('safezone');
    }


    get allowDrop()
    {
        return this.scope.get('allowDrop');
    }

    get allowDrag()
    {
        return this.scope.get('allowDrag');
    }

    get scrollPortal()
    {
        return this.scope.get('scrollPortal');
    }

    get renderHandle()
    {
        return this.scope.get('renderHandle');
    }

    get renderExpand()
    {
        return this.scope.get('renderExpand');
    }

    get renderSelect()
    {
        return this.scope.get('renderSelect');
    }

}