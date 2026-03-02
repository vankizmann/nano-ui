import { Mix } from "@kizmann/pico-js";
import { NConfirmElement } from "./NConfirmElement.ts";

export class NConfirmHandler
{

    static make(options : any = {}, type : string = null)
    {
        if ( Mix.isString(options) ) {
            options = { text: options };
        }

        if ( type != null ) {
            options.type = type;
        }

        const modal = new NConfirmElement(...[
            options
        ]);

        return modal.promise();
    }

}

export default NConfirmHandler;