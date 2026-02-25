/**
 * @class NInputNumberView
 * @extends {BaseView<NInputNumberController>}
 */
export class NInputNumberView {
    /**
     * @type {string}
     */
    bem: string;
    default(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    input(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    prev(): any;
    next(): any;
}
export default NInputNumberView;
