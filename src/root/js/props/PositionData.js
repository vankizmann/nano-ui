/**
 * @typedef {'top-start'|'top-center'|'top-end'|'bottom-start'|'bottom-center'|'bottom-end'|'left-start'|'left-center'|'left-end'|'right-start'|'right-center'|'right-end'} PopoverPosition
 */

/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class PositionData
{
    /**
     * @returns {PopoverPosition}
     */
    get position() {
        return this.scope.get('position');
    }

    /**
     * @param {PopoverPosition} value
     */
    set position(value) {
        this.scope.set('position', value);
    }

}

export default PositionData;