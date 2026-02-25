/**
 * @class NVirtualbarView
 * @extends {BaseView<NVirtualbarController>}
 */
export class NVirtualbarView {
    /**
     * @type {string}
     */
    bem: string;
    /**
     * @type {string}
     */
    vem: string;
    default(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    content(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    body(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    wrapper(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    grid(): any;
    list(): any;
    node(item: any, fn: any): any;
}
export default NVirtualbarView;
