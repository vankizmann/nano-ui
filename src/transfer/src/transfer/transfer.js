import { Str, Arr, Obj, Any, UUID } from "nano-js";

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
            return this.selectedSource.length && 
                this.selectedSource.length === this.tempSource.length;
        },

        sourceIntermediate()
        {
            return !! this.selectedSource.length && 
                this.selectedSource.length !== this.tempSource.length;
        },

        targetChecked()
        {
            return this.selectedTarget.length && 
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
            icon: this.icons.times,
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
            renderSelect: true,
            selected: this.selectedSource,
            safezone: () => -10,
            // viewportHeight: true,
            // disableMove: true,
            // updateDelay: 100,
            renderNode: this.ctor('renderNode'),
            onMove: this.moveItemsSource,
            'onRowDblclick': this.moveRowSource,
            'onUpdate:selected': this.updateSelectedSource
        };

        return (
            <div class="n-transfer__body">
                <NDraglist ref="source" {...props} />
            </div>
        );
    },

    renderTargetSelect()
    {
        let props = {
            modelValue: this.targetChecked,
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
            icon: this.icons.times,
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
            renderSelect: true,
            selected: this.selectedTarget,
            safezone: () => -1,
            // viewportHeight: true,
            // disableMove: true,
            // updateDelay: 100,
            renderNode: this.ctor('renderNode'),
            onMove: this.moveItemsTarget,
            'onRowDblclick': this.moveRowTarget,
            'onUpdate:selected': this.updateSelectedTarget
        };

        return (
            <div class="n-transfer__body">
                <NDraglist ref="target" {...props} />
            </div>
        );
    },

    renderNode(props)
    {
        if ( this.$slots.default ) {
            return this.$slots.default(props);
        }
        return (
            <div class="n-transfer__item">{ props.item.label }</div>
        );
    },

    renderMoveSource()
    {
        let props = {
            disabled: ! this.selectedSource.length,
            square: true, 
            icon: this.icons.angleRight,
            onClick: this.moveToTarget
        };

        // props.disabled = ! this.$refs.source ||
        //     this.$refs.source.tempSelected.length;

        return (
            <NButton {...props} />
        );
    },

    renderMoveTarget()
    {
        let props = {
            disabled: ! this.selectedTarget.length,
            square: true, 
            icon: this.icons.angleLeft,
            onClick: this.moveToSource
        };

        // props.disabled = ! this.$refs.target||
        //     this.$refs.target.tempSelected.length;

        return (
            <NButton {...props} />
        );
    },

    render($render)
    {
        return (
            <div class="n-transfer">
                <div class="n-transfer__pane">
                    { this.ctor('renderSourceHeader')() }
                    { this.ctor('renderSourceSearch')() }
                    { this.ctor('renderSourceBody')() }
                </div>
                <div class="n-transfer__controls">
                    { this.ctor('renderMoveSource')() }
                    { this.ctor('renderMoveTarget')() }
                </div>
                <div class="n-transfer__pane">
                    { this.ctor('renderTargetHeader')() }
                    { this.ctor('renderTargetSearch')() }
                    { this.ctor('renderTargetBody')() }
                </div>
            </div>
        );
    }

}