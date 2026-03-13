import { ProtoData } from "../../../root/index.ts";
import NFormGroupController from "./NFormGroupController.ts";

export class NFormGroupData extends ProtoData
{
    /**
     * @type {NFormGroupController}
     */
    declare scope : NFormGroupController;

    get classList() : string[]
    {
        let classList = [];

        const { bem } = this.scope.view;

        if ( this.align ) {
            classList.push(`${bem}--${this.align}`);
        }

        if ( this.superKind ) {
            classList.push(`${bem}--${this.superKind}`);
        }

        if ( this.collapse ) {
            classList.push('has-collapse');
        }

        return this.classRoot(classList);
    }

    get model(): boolean
    {
        return this.scope.get('modelValue');
    }

    get native() : string
    {
        return this.scope.get('nativeType');
    }

    get kind() : string
    {
        return this.scope.get('kind');
    }

    get superKind() : string
    {
        const ncx = this.scope.ncx('form');

        return this.kind || ncx?.get('kind');
    }

    get align() : string
    {
        return this.scope.get('align');
    }

    get label() : string
    {
        return this.scope.get('label');
    }

    get collapse(): boolean
    {
        return this.scope.get('collapse');
    }

    get grid() : string
    {
        return this.scope.get('grid');
    }

}

export default NFormGroupData;