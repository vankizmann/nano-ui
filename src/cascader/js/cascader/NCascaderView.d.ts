/**
 * @class NCascaderView
 * @extends {BaseView<NCascaderController>}
 */
export class NCascaderView {
    /**
     * @type {string}
     */
    bem: string;
    default(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    display(): any;
    popover(): any;
    panel(): any;
}
export default NCascaderView;
