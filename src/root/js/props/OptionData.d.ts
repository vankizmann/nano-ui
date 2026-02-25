/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class OptionData {
    /**
     * @param {array|object} value
     */
    set options(value: any[] | object);
    /**
     * @returns {array|object}
     */
    get options(): any[] | object;
    /**
     * @param {string} value
     */
    set optionValue(value: string);
    /**
     * @returns {string}
     */
    get optionValue(): string;
    /**
     * @param {string} value
     */
    set optionLabel(value: string);
    /**
     * @returns {string}
     */
    get optionLabel(): string;
}
export default OptionData;
