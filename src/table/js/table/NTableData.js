import { NDraglistData } from "../../../draggable/index.js";

/**
 * @class NTableData
 * @extends {ProtoData<NRadioGroupController>}
 */
export class NTableData extends NDraglistData
{

    get classList()
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get visible()
    {
        return this.scope.get('visible');
    }

    get filter()
    {
        return this.scope.get('filter');
    }

    get filterMap()
    {
        return this.scope.get('filterMap');
    }

    get looseWidth()
    {
        return this.scope.get('looseWidth');
    }

    set looseWidth(value)
    {
        this.scope.update('looseWidth', value);
    }

    get fixedWidth()
    {
        return this.scope.get('fixedWidth');
    }

    set fixedWidth(value)
    {
        this.scope.update('fixedWidth', value);
    }

    get sortProp()
    {
        return this.scope.get('sortProp');
    }

    get sortDir()
    {
        return this.scope.get('sortDir');
    }

}