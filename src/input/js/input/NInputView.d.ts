/**
 * @class NInputView
 * @extends {BaseView<NInputController>}
 */
export class NInputView {
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
    button(): any;
}
export default NInputView;
