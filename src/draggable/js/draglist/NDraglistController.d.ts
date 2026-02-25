/**
 * @class NDraglistController
 * @extends {BaseController<NDraglistController, NDraglistProps, NDraglistView, NDraglistData>}
 */
export class NDraglistController {
    constructor(props: any, context: any);
    setup(): this;
    onMounted(): void;
    drag: any;
    getValue(item: any, fallback?: any): any;
    getItem(value: any, fallback?: any): any;
    buildIndex(): number;
    buildVisibles(): any;
    buildRelation(): any;
    buildVirtuals(items?: any, ...args: any[]): any;
    extractValues(merge: any, item: any, index: any, depth?: number, path?: string[], prev?: any[]): any[];
    onDragmove(e: any, result: any, config: any, els: any): any;
    onDragdrop(e: any, result: any, config: any): any;
    onDragend(e: any, result: any, config: any): any;
    unlinkNodes(clone: any, result: any, config: any): any;
    removeNodes(clone: any, result: any, config: any): any;
    appendNodes(clone: any, result: any, config: any): any;
    insideNodes(clone: any, result: any, config: any): any;
    beforeNodes(clone: any, result: any, config: any): any;
    afterNodes(clone: any, result: any, config: any): any;
    nodeDragstart(e: any, item: any): void;
    nodeDragmove(e: any, result: any, config: any, els: any): any;
    nodeAllowDrop(target: any, result: any, config: any): boolean;
    nodeAllowSelect(value: any): any;
    setPrevCurrent(): void;
    setNextCurrent(): void;
    selectAll(): void;
    selectState(): 0 | 1 | 2;
}
export default NDraglistController;
