/**
 * @class NSwitchView
 * @extends {BaseView<NSwitchController>}
 */
export class NSwitchView {
    /**
     * @type {string}
     */
    bem: string;
    default(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    switch(): any;
    label(): any;
}
export default NSwitchView;
