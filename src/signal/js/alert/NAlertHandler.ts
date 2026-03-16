import { Mix } from "@kizmann/pico-js";
import { NAlertElement } from "./NAlertElement.ts";

export class NAlertHandler
{

    static make(options : any = {}, type : string = null)
    {
        if ( Mix.isString(options) ) {
            options = { text: options };
        }

        if ( type != null ) {
            options.type = type;
        }

        const modal = new NAlertElement(...[
            options
        ]);

        return modal.open();
    }

}

export default NAlertHandler;