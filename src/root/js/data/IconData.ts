import { ProtoController } from "../../index.ts";

export type IconPosition = 'before' | 'after';

export class IconData
{
    /**
     * @type {ProtoController}
     */
    declare scope : ProtoController;

    /**
     * @returns {string}
     */
    get icon() : IconPosition
    {
        return this.scope.get('icon');
    }

    /**
     * @param {string} value
     */
    set icon(value : string)
    {
        this.scope.set('icon', value);
    }

    /**
     * @returns {IconPosition}
     */
    get iconPosition() : IconPosition
    {
        return this.scope.get('iconPosition');
    }

    /**
     * @param {IconPosition} value
     */
    set iconPosition(value : IconPosition)
    {
        this.scope.set('iconPosition', value);
    }

    /**
     * @returns {boolean}
     */
    get iconDisabled() : boolean
    {
        return this.scope.get('iconDisabled');
    }

    /**
     * @param {boolean} value
     */
    set iconDisabled(value : boolean)
    {
        this.scope.set('iconDisabled', value);
    }

}

export default IconData;