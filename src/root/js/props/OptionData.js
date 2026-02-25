/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class OptionData
{
    /**
     * @returns {array|object}
     */
    get options()
    {
        return this.scope.get('options');
    }

    /**
     * @param {array|object} value
     */
    set options(value)
    {
        this.scope.set('options', value);
    }

    /**
     * @returns {string}
     */
    get optionValue() {
        return this.scope.get('optionValue');
    }

    /**
     * @param {string} value
     */
    set optionValue(value) {
        this.scope.set('optionValue', value);
    }

    /**
     * @returns {string}
     */
    get optionLabel() {
        return this.scope.get('optionLabel');
    }

    /**
     * @param {string} value
     */
    set optionLabel(value) {
        this.scope.set('optionLabel', value);
    }

}

export default OptionData;