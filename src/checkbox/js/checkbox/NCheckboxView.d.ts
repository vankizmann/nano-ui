/**
 * @class NCheckboxView
 * @extends {BaseView<NCheckboxController>}
 */
export class NCheckboxView {
    /**
     * @type {string}
     */
    bem: string;
    default(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    body(): any;
    checkbox(): any;
}
export default NCheckboxView;
