/**
 * @class ProtoView
 * @template {ProtoController} NCX
 */
export class ProtoView<NCX extends ProtoController> {
    constructor(scope: any);
    /**
     * @type {string}
     */
    bem: string;
    /**
     * @type {NCX}
     */
    scope: NCX;
    default(): any;
    slot(key?: string, ...args: any[]): any;
    icon(props?: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    comp(el: any, props?: any, slot?: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    div(props?: string, slot?: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    clear(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    angle(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    empty(options?: {}): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
}
export default ProtoView;
