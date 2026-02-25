export class NDragHandler {
    static type: string;
    static active: number;
    static config: {};
    static zones: {};
    static event: {
        altKey: boolean;
        metaKey: boolean;
        clientX: number;
        clientY: number;
        target: any;
    };
    static init(): typeof NDragHandler;
    static dragover(e: any): void;
    static dragdrop(e: any): void;
    static runDragover(e: any, target: any, frame: any): any;
    static runDragdrop(e: any, target: any, frame: any): any;
    static runDragend(e: any, options: any): any;
    static append(uid: any, config?: {}): any;
    static remove(uid: any): typeof NDragHandler;
    static dragstart(e: any, config?: {}, options?: {}): void;
    destroy(): void;
}
export default NDragHandler;
