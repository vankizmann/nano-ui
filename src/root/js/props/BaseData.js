/**
 * @typedef {'dark'|'light'} BaseTheme
 */

/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class BaseData
{
    /**
     * @returns {boolean}
     */
    get load()
    {
        return this.scope.get('load');
    }

    /**
     * @param {boolean} value
     */
    set load(value)
    {
        this.scope.set('load', value);
    }

    /**
     * @returns {boolean}
     */
    get disabled()
    {
        return this.scope.get('disabled');
    }

    /**
     * @param {boolean} value
     */
    set disabled(value)
    {
        this.scope.set('disabled', value);
    }

    /**
     * @returns {string}
     */
    get size()
    {
        return this.scope.get('size');
    }

    /**
     * @param {string} value
     */
    set size(value)
    {
        this.scope.set('size', value);
    }

    /**
     * @returns {string}
     */
    get type()
    {
        return this.scope.get('type');
    }

    /**
     * @param {string} value
     */
    set type(value)
    {
        this.scope.set('type', value);
    }

    /**
     * @returns {boolean}
     */
    get clearable()
    {
        return this.scope.get('clearable');
    }

    /**
     * @param {boolean} value
     */
    set clearable(value)
    {
        this.scope.set('clearable', value);
    }

    /**
     * @returns {any}
     */
    get clearValue()
    {
        return this.scope.get('clearValue');
    }

    /**
     * @param {any} value
     */
    set clearValue(value)
    {
        this.scope.set('clearValue', value);
    }

    /**
     * @returns {BaseTheme}
     */
    get theme()
    {
        return this.scope.get('theme');
    }

    /**
     * @param {BaseTheme} value
     */
    set theme(value)
    {
        this.scope.set('theme', value);
    }

}

export default BaseData;