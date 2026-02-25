export class NDragReciever {
    constructor(uid: any, options: any);
    uid: any;
    options: {
        dragmove: any;
        dragend: any;
        dragdrop: any;
    };
    dragmove(e: any, target: any, config: any): {
        uids: {
            zone: any;
            item: any;
        };
    };
    dragdrop(e: any, target: any, config: any): {
        uids: {
            zone: any;
            item: any;
        };
    };
    dragend(e: any, result: any, config: any): any;
    dragstart(e: any, config: any): void;
    getMode(event: any, el: any, safezone?: number): string;
}
