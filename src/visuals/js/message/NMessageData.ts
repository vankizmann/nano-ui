import { ProtoData } from "../../../root/index.ts";
import NMessageController from "./NMessageController.ts";

export class NMessageData extends ProtoData
{
    /**
     * @type {NMessageController}
     */
    declare scope : NMessageController;

    get classList() : string[]
    {
        let classList = [];

        if ( this.model ) {
            classList.push('n-active');
        }

        if ( this.title ) {
            classList.push('with-title');
        }

        return this.classRoot(classList);
    }

    get model() : boolean
    {
        return this.scope.get('modelValue');
    }

    get title() : string
    {
        return this.scope.get('title');
    }

    get closable() : boolean
    {
        return this.scope.get('closable');
    }

}

export default NMessageData;