/**
 * @typedef {'dark'|'light'} BaseTheme
 */
/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class BaseData {
    /**
     * @param {boolean} value
     */
    set load(value: boolean);
    /**
     * @returns {boolean}
     */
    get load(): boolean;
    /**
     * @param {boolean} value
     */
    set disabled(value: boolean);
    /**
     * @returns {boolean}
     */
    get disabled(): boolean;
    /**
     * @param {string} value
     */
    set size(value: string);
    /**
     * @returns {string}
     */
    get size(): string;
    /**
     * @param {string} value
     */
    set type(value: string);
    /**
     * @returns {string}
     */
    get type(): string;
    /**
     * @param {boolean} value
     */
    set clearable(value: boolean);
    /**
     * @returns {boolean}
     */
    get clearable(): boolean;
    /**
     * @param {any} value
     */
    set clearValue(value: any);
    /**
     * @returns {any}
     */
    get clearValue(): any;
    /**
     * @param {BaseTheme} value
     */
    set theme(value: BaseTheme);
    /**
     * @returns {BaseTheme}
     */
    get theme(): BaseTheme;
}
export default BaseData;
export type BaseTheme = "dark" | "light";
