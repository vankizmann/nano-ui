import { ProtoController } from "../../index.ts";

export type AlignDirection = 'horizontal' | 'vertical';
export type AlignPosition = 'left' | 'center' | 'right';

export class AlignData
{
    /**
     * @type {ProtoController}
     */
    declare scope : ProtoController;

    /**
     * @returns {AlignDirection|AlignPosition}
     */
    get align() : AlignDirection | AlignPosition
    {
        return this.scope.get('align');
    }

    /**
     * @param {AlignDirection|AlignPosition} value
     */
    set align(value : AlignDirection | AlignPosition)
    {
        this.scope.set('align', value);
    }

}

export default AlignData;