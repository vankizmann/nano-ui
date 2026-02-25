/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class TextData {
    /**
     * @param {string} value
     */
    set undefinedText(value: string);
    /**
     * @returns {string}
     */
    get undefinedText(): string;
    /**
     * @param {string} value
     */
    set emptyText(value: string);
    /**
     * @returns {string}
     */
    get emptyText(): string;
    /**
     * @param {string} value
     */
    set trueText(value: string);
    /**
     * @returns {string}
     */
    get trueText(): string;
    /**
     * @param {string} value
     */
    set falseText(value: string);
    /**
     * @returns {string}
     */
    get falseText(): string;
}
export default TextData;
