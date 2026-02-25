/**
 * @typedef {'top-start'|'top-center'|'top-end'|'bottom-start'|'bottom-center'|'bottom-end'|'left-start'|'left-center'|'left-end'|'right-start'|'right-center'|'right-end'} PopoverPosition
 */
/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class PositionData {
    /**
     * @param {PopoverPosition} value
     */
    set position(value: PopoverPosition);
    /**
     * @returns {PopoverPosition}
     */
    get position(): PopoverPosition;
}
export default PositionData;
export type PopoverPosition = "top-start" | "top-center" | "top-end" | "bottom-start" | "bottom-center" | "bottom-end" | "left-start" | "left-center" | "left-end" | "right-start" | "right-center" | "right-end";
