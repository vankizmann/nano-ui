export class NDragIndicator {
    /**
     * @type {PicoDom}
     */
    static el: PicoDom;
    static style: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
    static init(): typeof NDragIndicator;
    static reset(parent?: any): typeof NDragIndicator;
    static update(options?: {}): typeof NDragIndicator;
    static remove(): typeof NDragIndicator;
    static patch(options: any): typeof NDragIndicator;
    static show(options?: {}): typeof NDragIndicator;
}
