import { ProtoController } from "../../index.ts";

export class BaseData
{
    /**
     * @type {ProtoController}
     */
    declare scope : ProtoController;

    /**
     * @returns {boolean}
     */
    get load() : boolean
    {
        return this.scope.get('load');
    }

    /**
     * @param {boolean} value
     */
    set load(value : boolean)
    {
        this.scope.set('load', value);
    }

    /**
     * @returns {boolean}
     */
    get disabled() : boolean
    {
        return this.scope.get('disabled');
    }

    /**
     * @param {boolean} value
     */
    set disabled(value : boolean)
    {
        this.scope.set('disabled', value);
    }

    /**
     * @returns {string}
     */
    get size() : string
    {
        return this.scope.get('size');
    }

    /**
     * @param {string} value
     */
    set size(value : string)
    {
        this.scope.set('size', value);
    }

    /**
     * @returns {string}
     */
    get type() : string
    {
        return this.scope.get('type');
    }

    /**
     * @param {string} value
     */
    set type(value : string)
    {
        this.scope.set('type', value);
    }

    /**
     * @returns {string}
     */
    get theme() : string
    {
        return this.scope.get('theme');
    }

    /**
     * @param {string} value
     */
    set theme(value : string)
    {
        this.scope.set('theme', value);
    }

    /**
     * @returns {boolean}
     */
    get clearable() : boolean
    {
        return this.scope.get('clearable');
    }

    /**
     * @param {boolean} value
     */
    set clearable(value : boolean)
    {
        this.scope.set('clearable', value);
    }

    /**
     * @returns {any}
     */
    get clearValue() : any
    {
        return this.scope.get('clearValue');
    }

    /**
     * @param {any} value
     */
    set clearValue(value : any)
    {
        this.scope.set('clearValue', value);
    }

}

export default BaseData;