/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class DragData {
    /**
     * @param {array} value
     */
    set items(value: any[]);
    /**
     * @returns {array}
     */
    get items(): any[];
    /**
     * @param {object} value
     */
    set current(value: object);
    /**
     * @returns {object}
     */
    get current(): object;
    /**
     * @param {array} value
     */
    set selected(value: any[]);
    /**
     * @returns {array}
     */
    get selected(): any[];
    /**
     * @param {array} value
     */
    set expanded(value: any[]);
    /**
     * @returns {array}
     */
    get expanded(): any[];
    /**
     * @param {array} value
     */
    set group(value: any[]);
    /**
     * @returns {array}
     */
    get group(): any[];
    /**
     * @param {array} value
     */
    set allowGroups(value: any[]);
    /**
     * @returns {array}
     */
    get allowGroups(): any[];
    /**
     * @param {function} value
     */
    set safexone(value: Function);
    /**
     * @returns {function}
     */
    get safexone(): Function;
    /**
     * @param {boolean} value
     */
    set renderHandle(value: boolean);
    /**
     * @returns {boolean}
     */
    get renderHandle(): boolean;
    /**
     * @param {boolean} value
     */
    set renderExpand(value: boolean);
    /**
     * @returns {boolean}
     */
    get renderExpand(): boolean;
    /**
     * @param {boolean} value
     */
    set renderSelect(value: boolean);
    /**
     * @returns {boolean}
     */
    get renderSelect(): boolean;
    /**
     * @param {boolean|function} value
     */
    set allowSelect(value: boolean | Function);
    /**
     * @returns {boolean|function}
     */
    get allowSelect(): boolean | Function;
    /**
     * @param {boolean|function} value
     */
    set allowDrag(value: boolean | Function);
    /**
     * @returns {boolean|function}
     */
    get allowDrag(): boolean | Function;
    /**
     * @param {boolean|function} value
     */
    set allowDrop(value: boolean | Function);
    /**
     * @returns {boolean|function}
     */
    get allowDrop(): boolean | Function;
    /**
     * @param {function} value
     */
    set transformDrop(value: Function);
    /**
     * @returns {function}
     */
    get transformDrop(): Function;
    /**
     * @param {boolean} value
     */
    set insertNode(value: boolean);
    /**
     * @returns {boolean}
     */
    get insertNode(): boolean;
    /**
     * @param {boolean} value
     */
    set removeNode(value: boolean);
    /**
     * @returns {boolean}
     */
    get removeNode(): boolean;
    /**
     * @param {string} value
     */
    set uniqueProp(value: string);
    /**
     * @returns {string}
     */
    get uniqueProp(): string;
    /**
     * @param {string} value
     */
    set childProp(value: string);
    /**
     * @returns {string}
     */
    get childProp(): string;
    /**
     * @param {number} value
     */
    set itemHeight(value: number);
    /**
     * @returns {number}
     */
    get itemHeight(): number;
    /**
     * @param {number} value
     */
    set itemOffset(value: number);
    /**
     * @returns {number}
     */
    get itemOffset(): number;
    /**
     * @param {boolean} value
     */
    set itemSkip(value: boolean);
    /**
     * @returns {boolean}
     */
    get itemSkip(): boolean;
    /**
     * @param {boolean} value
     */
    set rootSkip(value: boolean);
    /**
     * @returns {boolean}
     */
    get rootSkip(): boolean;
}
export default DragData;
