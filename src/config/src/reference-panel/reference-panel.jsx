import { Arr, Obj, Mix } from "@kizmann/pico-js";

export default {

    name: 'NReferencePanel',

    props: {

        modelValue: {
            default()
            {
                return "";
            },
            type: [String]
        },

        model: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        scope: {
            default()
            {
                return {};
            },
            type: [Object]
        },

    },

    data()
    {
        return {
            expanded: [], selected: null, modelTree: this.buildTree(this.model, '$model'), scopeTree: this.buildTree(this.scope, '$scope')
        };
    },

    methods: {

        buildTree(value, path = '')
        {
            let result = {};

            if ( ! Mix.isObj(value) && ! Obj.get(value, '__v_skip') ) {
                return result;
            }

            for(var key in value) {

                let [ref, val] = [
                    `${path}.${key}`, value[key]
                ];

                if ( Mix.isObj(val) ) {
                    val = this.buildTree(val, ref);
                }

                let type = typeof val;

                if ( Mix.isArray(val) ) {
                    type = 'array';
                }

                result[key] = {
                    path: ref, value: val, type: type
                };

            }

            return result;
        },

        submitItem(value)
        {
            this.$emit('update:modelValue', value.path);
        },

        selectItem(value)
        {
            this.selected = value;
        },

        expandItem(value)
        {
            if ( value.type === 'object' ) {
                Arr.toggle(this.expanded, value.path);
            }
        }

    },

    renderLeaf(value, key)
    {
        let classList = [
            'n-reference-panel__item',
            'n-reference-panel__item--' + value.type,
        ];

        if ( Obj.get(this.selected, 'path') === value.path) {
            classList.push('is-selected');
        }

        if ( value.type === 'object' ) {
            classList.push('has-childs');
        }

        if ( Arr.has(this.expanded, value.path) ) {
            classList.push('is-expanded');
        }

        return (
            <div class={classList} onDblclick={() => this.submitItem(value)}>
                <div class="n-reference-panel__expand" onClick={() => this.expandItem(value)}>
                    <i class="fa fa-angle-right"></i>
                </div>
                <div class="n-reference-panel__name" onClick={() => this.selectItem(value)}>
                    {key}
                </div>
                <div class="n-reference-panel__type" onClick={() => this.selectItem(value)}>
                    {value.type}
                </div>
                <div class="n-reference-panel__pick" onClick={() => this.submitItem(value)}>
                    <i class="fa fa-expand"></i>
                </div>
            </div>
        );
    },

    renderTree(value, key)
    {
        let childItems = Arr.each(value.value, (value, key) => {
            return this.ctor('renderItem')(value, key);
        });

        let childHtml = (
            <div class="n-reference-panel__childs">
                {childItems}
            </div>
        );

        if ( ! Arr.has(this.expanded, value.path) ) {
            childHtml = null;
        }

        return [this.ctor('renderLeaf')(value, key), childHtml];
    },

    renderItem(value, key)
    {
        if ( value.type === 'object' ) {
            return this.ctor('renderTree')(value, key);
        }

        return this.ctor('renderLeaf')(value, key);
    },

    renderModel()
    {
        let modelHtml = Arr.each(this.modelTree, (value, key) => {
            return this.ctor('renderItem')(value, key);
        });

        return (
            <div class="n-reference-panel__model">
                {modelHtml}
            </div>
        );
    },

    renderScope()
    {
        let scopeHtml = Arr.each(this.scopeTree, (value, key) => {
            return this.ctor('renderItem')(value, key);
        });

        return (
            <div class="n-reference-panel__scope">
                {scopeHtml}
            </div>
        );
    },

    render()
    {
        return (
            <div class="n-reference-panel">
                {[this.ctor('renderModel')(), this.ctor('renderScope')()]}
            </div>
        );
    }

}