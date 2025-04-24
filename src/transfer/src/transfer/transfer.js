import { Str, Arr, Obj, Any, UUID } from "@kizmann/pico-js";

export default {

    name: 'NTransfer',

    props: {

        modelValue: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        options: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        sourceLabel: {
            default()
            {
                return 'Source';
            },
            type: [String]
        },

        targetLabel: {
            default()
            {
                return 'Target';
            },
            type: [String]
        },

        labelProp: {
            default()
            {
                return 'label';
            },
            type: [String]
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        }

    },

    computed: {

        sourceChecked()
        {
            return !! this.selectedSource.length && 
                this.selectedSource.length === this.tempSource.length;
        },

        sourceIntermediate()
        {
            return !! this.selectedSource.length && 
                this.selectedSource.length !== this.tempSource.length;
        },

        targetChecked()
        {
            return !! this.selectedTarget.length && 
                this.selectedTarget.length === this.tempTarget.length;
        },

        targetIntermediate()
        {
            return !! this.selectedTarget.length && 
                this.selectedTarget.length !== this.tempTarget.length;
        },

        tempSource()
        {
            let source = Arr.filter(this.options, (item) => {
                return ! Arr.find(this.tempValue, { [this.uniqueProp]: item[this.uniqueProp] });
            });

            if ( Any.isEmpty(this.sourceSearch) ) {
                return Arr.clone(source);
            }

            let searchPattern = new RegExp(this.sourceSearch, 'i');

            source = Arr.filter(source, (item) => {
                return item[this.labelProp].match(searchPattern);
            });

            return Arr.clone(source);
        },

        tempTarget()
        {
            let target = Arr.filter(this.options, (item) => {
                return !! Arr.find(this.tempValue, { [this.uniqueProp]: item[this.uniqueProp] });
            });

            if ( Any.isEmpty(this.targetSearch) ) {
                return Arr.clone(target);
            }

            let searchPattern = new RegExp(this.targetSearch, 'i');

            target = Arr.filter(target, (item) => {
                return item[this.labelProp].match(searchPattern);
            });

            return Arr.clone(target);
        }

    },
    data()
    {
        return {
            uid: UUID(),
            tempValue: this.modelValue,
            sourceSearch: '',
            targetSearch: '',
            selectedSource: [],
            selectedTarget: []
        };
    },

    watch: {

        modelValue(value)
        {
            if ( value !== this.tempValue ) {
                this.tempValue = value;
            }
        }

    },

    methods: {

        moveItemsTarget(options)
        {
            Arr.each(options, (source) => {

                let item = Arr.find(this.options, {
                    [this.uniqueProp]: source
                });

                Arr.add(this.tempValue, item, {
                    [this.uniqueProp]: source
                });

            });

            this.$emit('input', this.tempValue);
        },

        moveItemsSource(options)
        {
            Arr.each(options, (source) => {

                Arr.remove(this.tempValue, {
                    [this.uniqueProp]: source
                });

            });

            this.$emit('input', this.tempValue);
        },

        moveRowTarget(node)
        {
            // Get node unique
            let target = node.value[this.uniqueProp];

            // Remove item from selected list
            Arr.remove(this.selectedTarget, target);

            this.tempValue = Arr.remove(this.tempValue, {
                [this.uniqueProp]: target
            });

            this.$emit('update:modelValue', this.tempValue);
        },

        moveRowSource(node)
        {
            // Get node unique
            let source = node.value[this.uniqueProp];

            // Remove item from selected list
            Arr.remove(this.selectedSource, source);

            Arr.add(this.tempValue, node.item, source, {
                [this.uniqueProp]: source
            });

            this.$emit('update:modelValue', this.tempValue);
        },

        moveToSource()
        {
            Arr.each(this.selectedTarget, (target) => {

                Arr.remove(this.tempValue, {
                    [this.uniqueProp]: target
                });

            });

            this.selectedTarget = [];

            this.$emit('update:modelValue', this.tempValue);
        },

        moveToTarget()
        {
            Arr.each(this.selectedSource, (source) => {

                let item = Arr.find(this.options, {
                    [this.uniqueProp]: source
                });

                Arr.add(this.tempValue, item, {
                    [this.uniqueProp]: source
                });

            });

            this.selectedSource = [];

            this.$emit('update:modelValue', this.tempValue);
        },

        updateSelectedSource(selected)
        {
            this.selectedSource = selected;
        },

        updateSelectedTarget(selected)
        {
            this.selectedTarget = selected;
        }

    },

    renderSourceSelect()
    {
        let props = {
            modelValue: this.sourceChecked,
            size: this.size,
            type: this.type,
            intermediate: this.sourceIntermediate,
            disabled: ! this.tempSource.length
        };

        props['onUpdate:modelValue'] = () => {
            this.$refs.source.selectAll();
        };

        return (
            <div class="n-transfer__select">
                <NCheckbox {...props} />
            </div>
        );
    },

    renderSourceTitle()
    {
        let labelHtml = (
            <span class="n-transfer__item-title">
                { this.sourceLabel }
            </span>
        );

        let counterHtml = (
            <span class="n-transfer__item-count">
                { this.tempSource.length }
            </span>
        );

        return (
            <div class="n-transfer__title">
                { [labelHtml, counterHtml] }
            </div>
        );
    },

    renderSourceHeader()
    {
        return (
            <div class="n-transfer__header">
                { this.ctor('renderSourceSelect')() }
                { this.ctor('renderSourceTitle')() }
            </div>
        );
    },

    renderSourceSearch()
    {
        let props = {
            placeholder: this.trans('Search item'),
            size: this.size,
            type: this.type,
            icon: nano.Icons.times,
            iconDisabled: ! this.sourceSearch
        };

        props['onIconClick'] = () => {
            this.sourceSearch = '';
        };

        props['onUpdate:modelValue'] = () => {
            this.selectedSource = [];
        };

        return (
            <div class="n-transfer__search">
                <NInput vModel={this.sourceSearch} {...props} />
            </div>
        )
    },

    renderSourceBody()
    {
        let props = {
            group: [this.uid + 'source'],
            allowGroups: [this.uid + 'target'],
            items: this.tempSource,
            size: this.size,
            type: this.type,
            renderSelect: true,
            selected: this.selectedSource,
            safezone: () => -10,
            disableMove: true,
            renderNode: this.ctor('renderNode'),
            onMove: this.moveItemsSource,
            'onRowDblclick': this.moveRowSource,
            'onUpdate:selected': this.updateSelectedSource
        };

        return (
            <NDraglist ref="source" class="n-transfer__body" {...props} />
        );
    },

    renderTargetSelect()
    {
        let props = {
            modelValue: this.targetChecked,
            size: this.size,
            type: this.type,
            intermediate: this.targetIntermediate,
            disabled: ! this.tempTarget.length
        };

        props['onUpdate:modelValue'] = () => {
            this.$refs.target.selectAll();
        };

        return (
            <div class="n-transfer__select">
                <NCheckbox {...props} />
            </div>
        );
    },

    renderTargetTitle()
    {
        let labelHtml = (
            <span class="n-transfer__item-title">
                { this.targetLabel }
            </span>
        );

        let counterHtml = (
            <span class="n-transfer__item-count">
                { this.tempTarget.length }
            </span>
        );

        return (
            <div class="n-transfer__title">
                { [labelHtml, counterHtml] }
            </div>
        );
    },

    renderTargetHeader()
    {
        return (
            <div class="n-transfer__header">
                { this.ctor('renderTargetSelect')() }
                { this.ctor('renderTargetTitle')() }
            </div>
        );
    },

    renderTargetSearch()
    {
        let props = {
            placeholder: this.trans('Search item'),
            size: this.size,
            type: this.type,
            icon: nano.Icons.times,
            iconDisabled: ! this.targetSearch
        };

        props['onIconClick'] = () => {
            this.targetSearch = '';
        };

        props['onUpdate:modelValue'] = () => {
            this.selectedTarget = [];
        };

        return (
            <div class="n-transfer__search">
                <NInput vModel={this.targetSearch} {...props} />
            </div>
        )
    },

    renderTargetBody()
    {
        let props = {
            group: [this.uid + 'target'],
            allowGroups: [this.uid + 'source'],
            items: this.tempTarget,
            size: this.size,
            type: this.type,
            renderSelect: true,
            selected: this.selectedTarget,
            safezone: () => -1,
            disableMove: true,
            renderNode: this.ctor('renderNode'),
            onMove: this.moveItemsTarget,
            'onRowDblclick': this.moveRowTarget,
            'onUpdate:selected': this.updateSelectedTarget
        };

        return (
            <NDraglist ref="target" class="n-transfer__body" {...props} />
        );
    },

    renderNode(props)
    {
        if ( this.$slots.default ) {
            return this.$slots.default(props);
        }

        return (
            <div class="n-transfer__item">
                { Obj.get(props.item, this.labelProp) }
            </div>
        );
    },

    renderMoveSource()
    {
        let props = {
            disabled: ! this.selectedSource.length,
            size: this.size,
            type: this.type,
            square: true, 
            icon: nano.Icons.angleRight,
            onClick: this.moveToTarget
        };

        return (
            <NButton {...props} />
        );
    },

    renderMoveTarget()
    {
        let props = {
            disabled: ! this.selectedTarget.length,
            size: this.size,
            type: this.type,
            square: true, 
            icon: nano.Icons.angleLeft,
            onClick: this.moveToSource
        };
        return (
            <NButton {...props} />
        );
    },

    render($render)
    {
        let classList = [
            'n-transfer',
            'n-transfer--' + this.size,
            'n-transfer--' + this.type,
        ]

        return (
            <div class={classList}>
                <div class="n-transfer__panel">
                    { this.ctor('renderSourceHeader')() }
                    { this.ctor('renderSourceSearch')() }
                    { this.ctor('renderSourceBody')() }
                </div>
                <div class="n-transfer__controls">
                    { this.ctor('renderMoveSource')() }
                    { this.ctor('renderMoveTarget')() }
                </div>
                <div class="n-transfer__panel">
                    { this.ctor('renderTargetHeader')() }
                    { this.ctor('renderTargetSearch')() }
                    { this.ctor('renderTargetBody')() }
                </div>
            </div>
        );
    }

}