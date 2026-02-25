export default class NTableMatrixPlugin {
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
    matrix: object;
    /**
     * @type {object}
     */
    config: object;
    setup(): void;
    parse(): {};
    equal(item: any): boolean;
    disabled(item: any): any;
    uncheck(item: any): any;
    toggle(item: any): void;
}
