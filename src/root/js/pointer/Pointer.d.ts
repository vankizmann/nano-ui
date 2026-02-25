export class Pointer {
    static index: number;
    static instance: any;
    static signals: any[];
    static cursor: {
        clientX: number;
        clientY: number;
    };
    static init(): typeof Pointer;
    static zindex(): number;
    static on(e: any): void;
    static bind(id: any, type: any, cb: any): void;
    static unbind(id: any): void;
}
export default Pointer;
