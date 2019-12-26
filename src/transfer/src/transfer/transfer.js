import { Str, Arr, Obj, Any } from "nano-js";

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

        selectedSource()
        {
            let selected = Arr.each(this.selectedKeysSource, (key) => {
                return Arr.find(this.valueSource, { [this.uniqueProp]: key });
            });

            return Arr.clone(selected);
        },

        selectedTarget()
        {
            let selected = Arr.each(this.selectedKeysTarget, (key) => {
                return Arr.find(this.value, { [this.uniqueProp]: key });
            });

            return Arr.clone(selected);
        }

    },

    methods: {

        moveToSource()
        {
            Arr.each(this.selectedTarget, (target) => {

                Arr.remove(this.value, {
                    [this.uniqueProp]: Obj.get(target, this.uniqueProp)
                });

                Arr.add(this.valueSource, target);
            });

            this.selectedKeysSource = [];
            this.selectedKeysTarget = [];
        },

        moveToTarget()
        {
            Arr.each(this.selectedSource, (source) => {

                Arr.remove(this.valueSource, {
                    [this.uniqueProp]: Obj.get(source, this.uniqueProp)
                });

                Arr.add(this.value, source);
            });

            this.selectedKeysSource = [];
            this.selectedKeysTarget = [];
        },

        getSourceValue()
        {
            this.valueSource = Arr.filter(this.items, (item) => {

                let index = Arr.findIndex(this.value, {
                    [this.uniqueProp]: Obj.get(item, this.uniqueProp)
                });

                return index === -1;
            });
        }

    },

    data()
    {
        return {
            valueSource: [],
            selectedKeysSource: [],
            searchSource: '',
            selectedKeysTarget: [],
            searchTarget: ''
        };
    },

    beforeMount()
    {
        this.getSourceValue();

        this.$watch('items', this.getSourceValue);
        this.$watch('value', this.getSourceValue);
    },

    render()
    {

        let renderLabel = ({ value, key }) => {
            return (
                <div class="n-transfer__item">
                    <NCheckbox key={Obj.get(value, '_dragid')} sort={key} value={Obj.get(value, this.uniqueProp)} /> <span class="n-transfer__item-title">{Obj.get(value, this.labelProp)}</span>
                </div>
            );
        };

        let propsSource = {
            selected: this.selectedSource,
            uniqueProp: this.uniqueProp
        };

        let eventsSource = {

            'input': () => {
                this.selectedKeysSource = [];
                this.selectedKeysTarget = [];
            },

            'update:selected': (selected) => {
                this.selectedKeysSource = Arr.each(selected,
                    (item) => item[this.uniqueProp]);
            }

        };

        let propsTarget = {
            selected: this.selectedTarget,
            uniqueProp: this.uniqueProp
        };

        let eventsTarget = {

            'input': () => {
                this.selectedKeysSource = [];
                this.selectedKeysTarget = [];
            },

            'update:selected': (selected) => {
                this.selectedKeysTarget = Arr.each(selected,
                    (item) => item[this.uniqueProp]);
            }

        };

        let scopedSlots = {
            default: this.$scopedSlots.default || renderLabel
        };

        let valueSource = Arr.filter(this.valueSource, (item) => {

            if ( Any.isEmpty(this.searchSource) ) {
                return true;
            }

            let regex = new RegExp(
                Str.regexEscape(this.searchSource)
            , 'ig');

            return Obj.get(item, this.labelProp).match(regex);
        });

        let valueTarget = Arr.filter(this.value, (item) => {

            if ( Any.isEmpty(this.searchTarget) ) {
                return true;
            }

            let regex = new RegExp(
                Str.regexEscape(this.searchTarget)
            , 'ig');

            return Obj.get(item, this.labelProp).match(regex);
        });

        return (
            <div class="n-transfer">
                <div class="n-transfer__pane">
                    <NCheckboxGroup vModel={this.selectedKeysSource}>
                        <div class="n-transfer__header">
                            <div class="n-transfer__item">
                                <NCheckbox global={true}/> <span class="n-transfer__item-title">{ this.sourceLabel }</span> <span class="n-transfer__item-count">{ this.valueSource.length }</span>
                            </div>
                        </div>
                        <div class="n-transfer__search">
                            <NInput vModel={this.searchSource} placeholder={this.trans('Search item')} icon={this.icons.times} iconDisabled={Any.isEmpty(this.searchSource)} vOn:iconClick={() => this.searchSource = ''} />
                        </div>
                        <div class="n-transfer__body">
                            <NDraggable vModel={this.valueSource} displayItems={valueSource} props={propsSource} scopedSlots={scopedSlots} on={eventsSource} />
                        </div>
                    </NCheckboxGroup>
                </div>
                <div class="n-transfer__controls">
                    <NButton square={true} disabled={this.selectedKeysSource.length === 0} icon={this.icons.angleRight} vOn:click={() => this.moveToTarget()} />
                    <NButton square={true} disabled={this.selectedKeysTarget.length === 0} icon={this.icons.angleLeft} vOn:click={() => this.moveToSource()} />
                </div>
                <div class="n-transfer__pane">
                    <NCheckboxGroup vModel={this.selectedKeysTarget}>
                        <div class="n-transfer__header">
                            <div class="n-transfer__item">
                                <NCheckbox global={true} /> <span class="n-transfer__item-title">{ this.targetLabel }</span> <span class="n-transfer__item-count">{this.value.length}</span>
                            </div>
                        </div>
                        <div class="n-transfer__search">
                            <NInput vModel={this.searchTarget} placeholder={this.trans('Search item')} icon={this.icons.times} />
                        </div>
                        <div class="n-transfer__body">
                            <NDraggable vModel={this.value} displayItems={valueTarget} props={propsTarget} scopedSlots={scopedSlots} on={eventsTarget} />
                        </div>
                    </NCheckboxGroup>
                </div>
            </div>
        );
    }

}