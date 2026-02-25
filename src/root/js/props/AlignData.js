/**
 * @typedef {'horizontal'|'vertical'} AlignDirection
 */

/**
 * @typedef {'left'|'center'|'right'} AlignPosition
 */

/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class AlignData
{
    /**
     * @returns {AlignDirection|AlignPosition}
     */
    get align()
    {
        return this.scope.get('align');
    }

    /**
     * @param {AlignDirection|AlignPosition} value
     */
    set align(value)
    {
        this.scope.set('align', value);
    }

}

export default AlignData;