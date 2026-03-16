import { ProtoData } from "../../../root/index.ts";
import NTransferController from "./NTransferController.ts";
import { Locale } from "@kizmann/pico-js";

export class NTransferData extends ProtoData
{
    /**
     * @type {NTransferController}
     */
    declare scope : NTransferController;

    get classList() : string[]
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get model() : any[]
    {
        return this.scope.get('modelValue');
    }

    get source(): any[]
    {
        return this.scope.get('source');
    }

    get sourceSearch(): string
    {
        return this.scope.get('sourceSearch');
    }

    get target(): any[]
    {
        return this.scope.get('target');
    }

    get targetSearch(): string
    {
        return this.scope.get('targetSearch');
    }

    get options() : any[]
    {
        return this.scope.get('options');
    }

    get labelProp() : string
    {
        return this.scope.get('labelProp');
    }

    get uniqueProp() : string
    {
        return this.scope.get('uniqueProp');
    }

    get sourceLabel() : string
    {
        return this.scope.get('sourceLabel');
    }

    get $sourceLabel() : string
    {
        return Locale.trans(this.sourceLabel);
    }

    get sourcePlaceholder() : string
    {
        return this.scope.get('sourcePlaceholder');
    }

    get $sourcePlaceholder() : string
    {
        return Locale.trans(this.sourcePlaceholder);
    }

    get targetLabel() : string
    {
        return this.scope.get('targetLabel');
    }

    get $targetLabel() : string
    {
        return Locale.trans(this.targetLabel);
    }

    get targetPlaceholder() : string
    {
        return this.scope.get('targetPlaceholder');
    }

    get $targetPlaceholder() : string
    {
        return Locale.trans(this.targetPlaceholder);
    }

}

export default NTransferData;