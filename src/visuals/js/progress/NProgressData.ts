import { ProtoData } from "../../../root/index.ts";
import NProgressController from "./NProgressController.ts";

export class NProgressData extends ProtoData
{
    /**
     * @type {NProgressController}
     */
    declare scope : NProgressController;

    get classList() : string[]
    {
        const { view } = this.scope;

        const classList = [
            view.bem,
        ];

        if ( this.size != null ) {
            classList.push(`n-size-${this.size}`);
        }

        let type = this.type || 'primary';

        if ( this.state === 0 ) {
            type = 'neutral';
        }

        if ( this.state === 2 ) {
            type = 'success';
        }

        if ( this.state === 3 ) {
            type = 'danger';
        }

        classList.push(`n-type-${type}`);

        if ( this.state === 0 ) {
            classList.push('n-await');
        }

        if ( this.state === 1 ) {
            classList.push('n-active');
        }

        if ( this.state === 2 ) {
            classList.push('n-done');
        }

        if ( this.state === 3 ) {
            classList.push('n-abort');
        }

        return classList;
    }

    get model() : number
    {
        return this.scope.get('modelValue');
    }

    get value() : number
    {
        return Math.min(100, Math.max(0, this.model));
    }

    get state() : number
    {
        return this.scope.get('state');
    }

}

export default NProgressData;