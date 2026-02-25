/**
 * @class NTextareaView
 * @extends {BaseView<NTextareaController>}
 */
export class NTextareaView {
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
}
export default NTextareaView;
