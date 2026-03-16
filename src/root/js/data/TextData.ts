import { ProtoController } from "../../index.ts";

export class TextData
{
    /**
     * @type {ProtoController}
     */
    declare scope : ProtoController;

    /**
     * @returns {string}
     */
    get undefinedText() : string
    {
        return this.scope.get('undefinedText');
    }

    /**
     * @param {string} value
     */
    set undefinedText(value : string)
    {
        this.scope.set('undefinedText', value);
    }

    /**
     * @returns {string}
     */
    get emptyText() : string
    {
        return this.scope.get('emptyText');
    }

    /**
     * @param {string} value
     */
    set emptyText(value : string)
    {
        this.scope.set('emptyText', value);
    }

    /**
     * @returns {string}
     */
    get trueText() : string
    {
        return this.scope.get('trueText');
    }

    /**
     * @param {string} value
     */
    set trueText(value : string)
    {
        this.scope.set('trueText', value);
    }

    /**
     * @returns {string}
     */
    get falseText() : string
    {
        return this.scope.get('falseText');
    }

    /**
     * @param {string} value
     */
    set falseText(value : string)
    {
        this.scope.set('falseText', value);
    }

}

export default TextData;