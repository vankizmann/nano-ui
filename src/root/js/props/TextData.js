/**
 * @memberof ProtoData
 * @extends {ProtoData}
 */
export class TextData
{
    /**
     * @returns {string}
     */
    get undefinedText() {
        return this.scope.get('undefinedText');
    }

    /**
     * @param {string} value
     */
    set undefinedText(value) {
        this.scope.set('undefinedText', value);
    }

    /**
     * @returns {string}
     */
    get emptyText() {
        return this.scope.get('emptyText');
    }

    /**
     * @param {string} value
     */
    set emptyText(value) {
        this.scope.set('emptyText', value);
    }

    /**
     * @returns {string}
     */
    get trueText() {
        return this.scope.get('trueText');
    }

    /**
     * @param {string} value
     */
    set trueText(value) {
        this.scope.set('trueText', value);
    }

    /**
     * @returns {string}
     */
    get falseText() {
        return this.scope.get('falseText');
    }

    /**
     * @param {string} value
     */
    set falseText(value) {
        this.scope.set('falseText', value);
    }
    
}

export default TextData;