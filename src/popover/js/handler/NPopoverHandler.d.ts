export class NPopoverHandler {
    static popovers: any[];
    static chain: {};
    static init(): typeof NPopoverHandler;
    static scroll(event: any): void;
    static mousedown(event: any): void;
    static mousemove(event: any): void;
    static context(event: any): void;
    static escape(event: any): void;
    static append(el: any, config: any): NPopoverElement;
    static remove(el: any, { uid }: {
        uid: any;
    }): void;
    static prevent(uid: any, el: any): void;
    static release(uid: any): void;
    static blocked(uid: any): boolean;
}
export default NPopoverHandler;
import NPopoverElement from "./NPopoverElement.js";
