import { ProtoController } from "../../index.ts";

export type PopoverPositionTop =
    'top-start' |
    'top-center' |
    'top-end';

export type PopoverPositionBottom =
    'bottom-start' |
    'bottom-center' |
    'bottom-end';

export type PopoverPositionLeft =
    'left-start' |
    'left-center' |
    'left-end';

export type PopoverPositionRight =
    'right-start' |
    'right-center' |
    'right-end';

export type PopoverPosition =
    PopoverPositionTop |
    PopoverPositionBottom |
    PopoverPositionLeft |
    PopoverPositionRight;

export type DrawerPosition =
    'top' |
    'bottom' |
    'left' |
    'right';

export type ModalPosition =
    PopoverPosition |
    'center-center';

export class PositionData
{
    /**
     * @type {ProtoController}
     */
    declare scope : ProtoController;

    /**
     * @returns {PopoverPosition|DrawerPosition|ModalPosition}
     */
    get position() : PopoverPosition | DrawerPosition | ModalPosition
    {
        return this.scope.get('position');
    }

    /**
     * @param {PopoverPosition|DrawerPosition|ModalPosition} value
     */
    set position(value : PopoverPosition | DrawerPosition | ModalPosition)
    {
        this.scope.set('position', value);
    }

}

export default PositionData;