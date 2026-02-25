export default class NTableSelectPlugin {
    constructor(table: any, column: any);
    /**
     * @type {NTableController}
     */
    table: NTableController;
    /**
     * @type {NTableColumnController}
     */
    column: NTableColumnController;
    /**
     * @type {object}
     */
    config: object;
    equal(item: any): boolean;
    disabled(item: any): any;
    uncheck(item: any): any;
    toggle(item: any): void;
}
