/**
 * @typedef {'before'|'after'} IconPosition
 */

/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class IconData
{
    /**
     * @returns {string}
     */
    get icon()
    {
        return this.scope.get('icon');
    }

    /**
     * @param {string} value
     */
    set icon(value)
    {
        this.scope.set('icon', value);
    }

    /**
     * @returns {IconPosition}
     */
    get iconPosition()
    {
        return this.scope.get('iconPosition');
    }

    /**
     * @param {IconPosition} value
     */
    set iconPosition(value)
    {
        this.scope.set('iconPosition', value);
    }

    /**
     * @returns {boolean}
     */
    get iconDisabled()
    {
        return this.scope.get('iconDisabled');
    }

    /**
     * @param {boolean} value
     */
    set iconDisabled(value)
    {
        this.scope.set('iconDisabled', value);
    }

}

export default IconData;