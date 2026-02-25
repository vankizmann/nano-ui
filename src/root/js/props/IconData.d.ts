/**
 * @typedef {'before'|'after'} IconPosition
 */
/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class IconData {
    /**
     * @param {string} value
     */
    set icon(value: string);
    /**
     * @returns {string}
     */
    get icon(): string;
    /**
     * @param {IconPosition} value
     */
    set iconPosition(value: IconPosition);
    /**
     * @returns {IconPosition}
     */
    get iconPosition(): IconPosition;
    /**
     * @param {boolean} value
     */
    set iconDisabled(value: boolean);
    /**
     * @returns {boolean}
     */
    get iconDisabled(): boolean;
}
export default IconData;
export type IconPosition = "before" | "after";
