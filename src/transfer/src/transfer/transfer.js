import { Str, Arr, Obj, Any, UUID } from "nano-js";

export default {

    name: 'NTransfer',

    props: {

        value: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        items: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        sourceLabel: {
            default()
            {
                return this.trans('Source');
            },
            type: [String]
        },

        targetLabel: {
            default()
            {
                return this.trans('Target');
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

        veSource()
        {
            let source = Arr.filter(this.items, (item) => {
                return ! Arr.find(this.veValue, { [this.uniqueProp]: item[this.uniqueProp] });
            });

            if ( Any.isEmpty(this.veSourceSearch) ) {
                return Arr.clone(source);
            }

            let searchPattern = new RegExp(this.veSourceSearch, 'i');

            source = Arr.filter(source, (item) => {
                return item[this.labelProp].match(searchPattern);
            });

            return Arr.clone(source);
        },

        veTarget()
        {
            let target = Arr.filter(this.items, (item) => {
                return !! Arr.find(this.veValue, { [this.uniqueProp]: item[this.uniqueProp] });
            });

            if ( Any.isEmpty(this.veTargetSearch) ) {
                return Arr.clone(target);
            }

            let searchPattern = new RegExp(this.veTargetSearch, 'i');

            target = Arr.filter(target, (item) => {
                return item[this.labelProp].match(searchPattern);
            });

            return Arr.clone(target);
        }

    },
    data()
    {
        return {
            veID: UUID(),
            veValue: this.value,
            veSourceSearch: '',
            veTargetSearch: '',
            veSelectedSource: [],
            veSelectedTarget: []
        };
    },

    methods: {

        moveItemsTarget(items)
        {
            Arr.each(items.split(','), (source) => {

                let item = Arr.find(this.items, {
                    [this.uniqueProp]: source
                });

                Arr.add(this.veValue, item, {
                    [this.uniqueProp]: source
                });

            });

            this.$emit('input', this.veValue);
        },

        moveItemsSource(items)
        {
            Arr.each(items.split(','), (source) => {

                Arr.remove(this.veValue, {
                    [this.uniqueProp]: source
                });

            });

            this.$emit('input', this.veValue);
        },

        moveRowTarget(row)
        {
            // Get row unique
            let target = row[this.uniqueProp];

            // Remove item from selected list
            Arr.remove(this.veSelectedTarget, target);

            Arr.remove(this.veValue, {
                [this.uniqueProp]: target
            });

            this.$emit('input', this.veValue);
        },

        moveRowSource(row)
        {
            // Get row unique
            let source = row[this.uniqueProp];

            // Remove item from selected list
            Arr.remove(this.veSelectedSource, source);

            Arr.add(this.veValue, row.item, source, {
                [this.uniqueProp]: source
            });

            this.$emit('input', this.veValue);
        },

        moveToSource()
        {
            Arr.each(this.$refs.target.veSelected, (target) => {

                Arr.remove(this.veValue, {
                    [this.uniqueProp]: target
                });

            });

            this.$refs.target.unselectAllItems();

            this.$emit('input', this.veValue);
        },

        moveToTarget()
        {
            Arr.each(this.$refs.source.veSelected, (source) => {

                let item = Arr.find(this.items, {
                    [this.uniqueProp]: source
                });

                Arr.add(this.veValue, item, source, {
                    [this.uniqueProp]: source
                });

            });

            this.$refs.source.unselectAllItems();

            this.$emit('input', this.veValue);
        },

        toggleSourceSelected()
        {
            this.$refs.source.toggleAllItems(
                this.$refs.source.isIntermediate(true)
            );
        },

        toggleTargetSelected()
        {
            this.$refs.target.toggleAllItems(
                this.$refs.target.isIntermediate(true)
            );
        },

        updateSelectedSource(selected)
        {
            this.veSelectedSource = selected;
        },

        updateSelectedTarget(selected)
        {
            this.veSelectedTarget = selected;
        }

    },

    renderSourceSelect()
    {
        let events = {
            input: this.toggleSourceSelected
        };

        let props = {
            disabled: ! this.veSource.length
        };

        if ( this.$refs.source && this.veSource.length ) {
            props['checked'] = this.$refs.source.isAllSelected(true);
            props['intermediate'] = this.$refs.source.isIntermediate(true);
        }

        return (
            <div class="n-transfer__select">
                <NCheckbox props={props} on={events} />
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
            <span key={UUID()} class="n-transfer__item-count">
                { this.veSource.length }
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
            iconDisabled: ! this.veSourceSearch
        };

        let events = {
            input: () => this.$refs.source.unselectAllItems()
        };

        events['icon-click'] = () => this.veSourceSearch = '';

        return (
            <div class="n-transfer__search">
                <NInput vModel={this.veSourceSearch} props={props} on={events} />
            </div>
        )
    },

    renderSourceBody()
    {
        let props = {
            group: [this.veID],
            items: this.veSource,
            renderSelect: true,
            viewportHeight: true,
            disableMove: true,
            updateDelay: 100,
            renderNode: this.ctor('renderNode'),
        };

        let events = {
            'move': this.moveItemsSource,
            'row-dblclick': this.moveRowSource,
            'update:selected': this.updateSelectedSource
        };

        return (
            <div class="n-transfer__body">
                <NDraggable ref="source" props={props} on={events} />
            </div>
        );
    },

    renderTargetSelect()
    {
        let events = {
            input: this.toggleTargetSelected
        };

        let props = {
            disabled: ! this.veTarget.length
        };

        if ( this.$refs.target && this.veTarget.length ) {
            props['checked'] = this.$refs.target.isAllSelected(true);
            props['intermediate'] = this.$refs.target.isIntermediate(true);
        }

        return (
            <div class="n-transfer__select">
                <NCheckbox props={props} on={events} />
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
            <span key={UUID()} class="n-transfer__item-count">
                { this.veTarget.length }
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
            iconDisabled: ! this.veTargetSearch
        };

        let events = {
            input: () => this.$refs.target.unselectAllItems()
        };

        events['icon-click'] = () => this.veTargetSearch = '';

        return (
            <div class="n-transfer__search">
                <NInput vModel={this.veTargetSearch} props={props} on={events} />
            </div>
        )
    },

    renderTargetBody()
    {
        let props = {
            group: [this.veID],
            items: this.veTarget,
            renderSelect: true,
            viewportHeight: true,
            disableMove: true,
            updateDelay: 100,
            renderNode: this.ctor('renderNode'),
        };

        let events = {
            'move': this.moveItemsTarget,
            'row-dblclick': this.moveRowTarget,
            'update:selected': this.updateSelectedTarget
        };

        return (
            <div class="n-transfer__body">
                <NDraggable ref="target" props={props} on={events} />
            </div>
        );
    },

    renderNode(props)
    {
        if ( this.$scopedSlots.default ) {
            return this.$scopedSlots.default(props);
        }
        return (
            <div class="n-transfer__item">{ props.value[this.labelProp] }</div>
        );
    },

    renderMoveSource()
    {
        let events = {
            click: this.moveToTarget
        };

        let props = {
            square: true, icon: this.icons.angleRight
        };

        props.disabled = ! this.veSelectedSource.length;

        return (
            <NButton key={UUID()} props={props} on={events} />
        );
    },

    renderMoveTarget()
    {
        let events = {
            click: this.moveToSource
        };

        let props = {
            square: true, icon: this.icons.angleLeft
        };

        props.disabled = ! this.veSelectedTarget.length;

        return (
            <NButton key={UUID()} props={props} on={events} />
        );
    },

    render($render)
    {
        this.$render = $render;

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