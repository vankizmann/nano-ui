import { ProtoData } from "../../../root/index.ts";
import NFormBagController from "./NFormBagController.ts";

export class NFormBagData extends ProtoData
{
    /**
     * @type {NFormBagController}
     */
    declare scope : NFormBagController;

    get classList() : string[]
    {
        let classList = [];

        return this.classRoot(classList);
    }

}

export default NFormBagData;