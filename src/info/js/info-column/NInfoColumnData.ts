import { ProtoExtend, ProtoData, OptionData, TextData } from "../../../root/index.ts";
import NInfoColumnController from "./NInfoColumnController.ts";

export class NInfoColumnData extends ProtoExtend([ProtoData, OptionData, TextData])
{
    /**
     * @type {NInfoColumnController}
     */
    declare scope : NInfoColumnController;

    get data():any
    {
        return this.scope.get('data');
    }

    get type() : string
    {
        return this.scope.get('type');
    }

    get label() : string
    {
        return this.scope.get('label');
    }

    get prop() : string
    {
        return this.scope.get('prop');
    }

    get optionsMap():any
    {
        return this.scope.get('optionsMap');
    }

    get datetimeFormat()
    {
        return this.scope.get('datetimeFormat');
    }

}

export interface NInfoColumnData extends ProtoData, OptionData, TextData {}