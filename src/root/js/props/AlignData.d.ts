/**
 * @typedef {'horizontal'|'vertical'} AlignDirection
 */
/**
 * @typedef {'left'|'center'|'right'} AlignPosition
 */
/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class AlignData {
    /**
     * @param {AlignDirection|AlignPosition} value
     */
    set align(value: AlignDirection | AlignPosition);
    /**
     * @returns {AlignDirection|AlignPosition}
     */
    get align(): AlignDirection | AlignPosition;
}
export default AlignData;
export type AlignDirection = "horizontal" | "vertical";
export type AlignPosition = "left" | "center" | "right";
