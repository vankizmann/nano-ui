/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class DragData
{
    /**
     * @returns {array}
     */
    get items() {
        return this.scope.get('items');
    }

    /**
     * @param {array} value
     */
    set items(value) {
        this.scope.set('items', value);
    }

    /**
     * @returns {object}
     */
    get current()
    {
        return this.scope.get('current');
    }

    /**
     * @param {object} value
     */
    set current(value)
    {
        this.scope.set('current', value);
    }

    /**
     * @returns {array}
     */
    get selected() {
        return this.scope.get('selected');
    }

    /**
     * @param {array} value
     */
    set selected(value) {
        this.scope.set('selected', value);
    }

    /**
     * @returns {array}
     */
    get expanded() {
        return this.scope.get('expanded');
    }

    /**
     * @param {array} value
     */
    set expanded(value) {
        this.scope.set('expanded', value);
    }

    /**
     * @returns {array}
     */
    get group() {
        return this.scope.get('group');
    }

    /**
     * @param {array} value
     */
    set group(value) {
        this.scope.set('group', value);
    }

    /**
     * @returns {array}
     */
    get allowGroups() {
        return this.scope.get('allowGroups');
    }

    /**
     * @param {array} value
     */
    set allowGroups(value) {
        this.scope.set('allowGroups', value);
    }

    /**
     * @returns {function}
     */
    get safexone() {
        return this.scope.get('safexone');
    }

    /**
     * @param {function} value
     */
    set safexone(value) {
        this.scope.set('safexone', value);
    }

    /**
     * @returns {boolean}
     */
    get renderHandle() {
        return this.scope.get('renderHandle');
    }

    /**
     * @param {boolean} value
     */
    set renderHandle(value) {
        this.scope.set('renderHandle', value);
    }

    /**
     * @returns {boolean}
     */
    get renderExpand() {
        return this.scope.get('renderExpand');
    }

    /**
     * @param {boolean} value
     */
    set renderExpand(value) {
        this.scope.set('renderExpand', value);
    }

    /**
     * @returns {boolean}
     */
    get renderSelect() {
        return this.scope.get('renderSelect');
    }

    /**
     * @param {boolean} value
     */
    set renderSelect(value) {
        this.scope.set('renderSelect', value);
    }

    /**
     * @returns {boolean|function}
     */
    get allowSelect() {
        return this.scope.get('allowSelect');
    }

    /**
     * @param {boolean|function} value
     */
    set allowSelect(value) {
        this.scope.set('allowSelect', value);
    }

    /**
     * @returns {boolean|function}
     */
    get allowDrag() {
        return this.scope.get('allowDrag');
    }

    /**
     * @param {boolean|function} value
     */
    set allowDrag(value) {
        this.scope.set('allowDrag', value);
    }

    /**
     * @returns {boolean|function}
     */
    get allowDrop() {
        return this.scope.get('allowDrop');
    }

    /**
     * @param {boolean|function} value
     */
    set allowDrop(value) {
        this.scope.set('allowDrop', value);
    }

    /**
     * @returns {function}
     */
    get transformDrop() {
        return this.scope.get('transformDrop');
    }

    /**
     * @param {function} value
     */
    set transformDrop(value) {
        this.scope.set('transformDrop', value);
    }

    /**
     * @returns {boolean}
     */
    get insertNode() {
        return this.scope.get('insertNode');
    }

    /**
     * @param {boolean} value
     */
    set insertNode(value) {
        this.scope.set('insertNode', value);
    }

    /**
     * @returns {boolean}
     */
    get removeNode() {
        return this.scope.get('removeNode');
    }

    /**
     * @param {boolean} value
     */
    set removeNode(value) {
        this.scope.set('removeNode', value);
    }

    /**
     * @returns {string}
     */
    get uniqueProp() {
        return this.scope.get('uniqueProp');
    }

    /**
     * @param {string} value
     */
    set uniqueProp(value) {
        this.scope.set('uniqueProp', value);
    }

    /**
     * @returns {string}
     */
    get childProp() {
        return this.scope.get('childProp');
    }

    /**
     * @param {string} value
     */
    set childProp(value) {
        this.scope.set('childProp', value);
    }

    /**
     * @returns {number}
     */
    get itemHeight() {
        return this.scope.get('itemHeight');
    }

    /**
     * @param {number} value
     */
    set itemHeight(value) {
        this.scope.set('itemHeight', value);
    }

    /**
     * @returns {number}
     */
    get itemOffset() {
        return this.scope.get('itemOffset');
    }

    /**
     * @param {number} value
     */
    set itemOffset(value) {
        this.scope.set('itemOffset', value);
    }

    /**
     * @returns {boolean}
     */
    get itemSkip() {
        return this.scope.get('itemSkip');
    }

    /**
     * @param {boolean} value
     */
    set itemSkip(value) {
        this.scope.set('itemSkip', value);
    }

    /**
     * @returns {boolean}
     */
    get rootSkip() {
        return this.scope.get('rootSkip');
    }

    /**
     * @param {boolean} value
     */
    set rootSkip(value) {
        this.scope.set('rootSkip', value);
    }

}

export default DragData;