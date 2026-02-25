/**
 * @class NTableColumnController
 * @extends {BaseController<NTableColumnController, NTableColumnProps, NTableColumnView, NTableColumnData>}
 */
export class NTableColumnController {
    constructor(props: any, context: any);
    plugin: any;
    setup(): this;
    onMounted(): void;
    onUnmounted(): void;
    createOptionsMap(): any;
    getOptions(): any;
    getOption(value: any): any;
    getVisibility(width?: number): boolean;
}
export default NTableColumnController;
