/**
 * @template NCX
 * @typedef {{ ncx: NCX, setupState: Record<string, any> }} FakeVueInstance
 */
/**
 * @template NCX, VIEW, DATA
 * @typedef {Object} BaseComponentUnpack
 * @property {NCX} scope
 * @property {VIEW} view
 * @property {DATA} data
 * @property {HTMLElement | null} el
 * @property {Record<string, any>} refs
 */
/**
 * @template NCX, PROPS, VIEW, DATA
 */
export class ProtoController<NCX, PROPS, VIEW, DATA> {
    constructor(props: any, context: any);
    /**
     * @type {ComponentInternalInstance | FakeVueInstance}
     */
    instance: ComponentInternalInstance | FakeVueInstance;
    /**
     * @type {SetupContext}
     */
    context: SetupContext;
    /**
     * @type {typeof PROPS}
     */
    props: typeof PROPS;
    /**
     * @type {VIEW}
     */
    view: VIEW;
    /**
     * @type {DATA}
     */
    data: DATA;
    /**
     @type {Record<string, any>}
     */
    vals: Record<string, any>;
    /**
     * @type {Record<string, any>}
     */
    refs: Record<string, any>;
    /**
     @type {Record<string, any>}
     */
    signals: Record<string, any>;
    /**
     * @type {string}
     */
    uid: string;
    /**
     * @type {HTMLElement | null}
     */
    el: HTMLElement | null;
    setup(): this;
    dispose(fn: any): void;
    pass(keys?: any[]): void;
    /**
     * @this {ProtoController<NCX,VIEW,DATA>}
     */
    unpack(this: ProtoController<NCX, VIEW, DATA, any>): {
        scope: ProtoController<NCX, VIEW, DATA, any>;
        el: HTMLElement;
        view: DATA;
        data: any;
        refs: Record<string, any>;
    };
    render(): () => any;
    has(key: any): any;
    empty(key: any): any;
    get(key: any, fallback?: any): any;
    set(key: any, value: any): any;
    update(key: any, value: any): any;
    prop(key: any, fallback?: any): any;
    ref(key: any, fallback?: any): any;
    dom(key: any): any;
    emit(event: any, ...args: any[]): void;
    injectRef(key: any, fallback?: any): any;
    cloneProp(key: any, options?: {}): this;
    linkProp(key: any, source?: any, freeze?: boolean): this;
    watchProp(key: any, cb: any, options?: {}): this;
    watchData(key: any, cb: any, options?: {}): this;
    makeLinkData(key: any, source: any, cb: any, options?: {}): this;
    makeLinkProp(key: any, source: any, cb: any, options?: {}): this;
    compData(key: any, cb: any): this;
    makeData(key: any, value?: any): this;
    exposeData(key: any): this;
    makeRef(key: any): this;
    makeUID(): void;
    passProps(value: any, keys?: any[]): any;
    onSignal(event: any, cb: any): void;
    offSignal(uid: any): void;
    fireSignal(event: any, ...args: any[]): void;
    get attrs(): {
        [x: string]: unknown;
    };
}
export default ProtoController;
export type FakeVueInstance<NCX> = {
    ncx: NCX;
    setupState: Record<string, any>;
};
export type BaseComponentUnpack<NCX, VIEW, DATA> = {
    scope: NCX;
    view: VIEW;
    data: DATA;
    el: HTMLElement | null;
    refs: Record<string, any>;
};
import { ComponentInternalInstance } from "vue";
import { SetupContext } from "vue";
