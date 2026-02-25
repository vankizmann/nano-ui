/**
 * @class NTableView
 * @extends {BaseView<NTableController>}
 */
export class NTableView {
    /**
     * @type {string}
     */
    bem: string;
    buffer: {};
    resolve(type: any, scope?: string): any;
    default(): any;
    header(): any;
    draghead(): any;
    context(): any;
    column(column: any, index: any): any;
    sort(column: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    label(column: any): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    filter(column: any): any[];
    popover(column: any): any;
    body(): any;
    rows(node: any): any;
    cell(node: any, column: any, index: any): any;
}
export default NTableView;
