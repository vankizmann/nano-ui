import { ProtoController } from "../../index.ts";

export class OptionData
{
    /**
     * @type {ProtoController}
     */
    declare scope : ProtoController;

    /**
     * @returns {any}
     */
    get options() : any
    {
        return this.scope.get('options');
    }

    /**
     * @param {any} value
     */
    set options(value : any)
    {
        this.scope.set('options', value);
    }

    /**
     * @returns {string}
     */
    get optionsValue() : string
    {
        return this.scope.get('optionsValue');
    }

    /**
     * @param {string} value
     */
    set optionsValue(value : string)
    {
        this.scope.set('optionsValue', value);
    }

    /**
     * @returns {string}
     */
    get optionsLabel() : string
    {
        return this.scope.get('optionsLabel');
    }

    /**
     * @param {string} value
     */
    set optionsLabel(value : string)
    {
        this.scope.set('optionsLabel', value);
    }

}

export default OptionData;