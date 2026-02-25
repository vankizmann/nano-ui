/**
 * @class NCascaderPanelView
 * @extends {BaseView<NCascaderPanelController>}
 */
export class NCascaderPanelView {
    /**
     * @type {string}
     */
    bem: string;
    default(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    items(items: any): any;
    item(item: any): any;
}
export default NCascaderPanelView;
