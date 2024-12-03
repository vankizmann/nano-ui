import { Arr, Dom, Any, Locale, Obj, UUID } from "@kizmann/pico-js";

global.NanoBuilderPropType = {
    'root': Locale.trans('Root'),
    'binds': Locale.trans('Bind'),
    'props': Locale.trans('Property'),
    'attrs': Locale.trans('Attribute'),
    'on': Locale.trans('Event'),
};

global.NanoBuilderPropCode = {
    'string': Locale.trans('String'),
    'number': Locale.trans('Number'),
    'boolean': Locale.trans('Boolean'),
    'object': Locale.trans('Object'),
    'function': Locale.trans('Function'),
};

global.NanoBuilderProps = {
    classList: {
        for: ['root', 'attrs', 'props'], type: 'String'
    },
    vIf: {
        for: ['root'], type: 'String'
    },
    vShow: {
        for: ['root'], type: 'String'
    },
};

global.NanoBuilderTypes = {
    //
};

global.NanoBuilderIndexies = {
    //
};

// DOM elements
require('./prototypes/html/nano');
require('./prototypes/html/div');
require('./prototypes/html/span');

// Nano elements
require('./prototypes/button/n-button');
require('./prototypes/button/n-button-group');
require('./prototypes/cascader/n-cascader');
require('./prototypes/checkbox/n-checkbox');
require('./prototypes/checkbox/n-checkbox-group');
require('./prototypes/confirm/n-confirm');
require('./prototypes/datepicker/n-datepicker');
require('./prototypes/datetimepicker/n-datetimepicker');
require('./prototypes/durationpicker/n-durationpicker');
require('./prototypes/empty/n-empty');
require('./prototypes/form/n-form');
require('./prototypes/form/n-form-group');
require('./prototypes/form/n-form-item');
require('./prototypes/input/n-input');
require('./prototypes/input-number/n-input-number');
require('./prototypes/loader/n-loader');
require('./prototypes/modal/n-modal');
require('./prototypes/radio/n-radio');
require('./prototypes/radio/n-radio-group');
require('./prototypes/rating/n-rating');
require('./prototypes/select/n-select');
require('./prototypes/slider/n-slider');
require('./prototypes/switch/n-switch');
require('./prototypes/table/n-table');
require('./prototypes/table/n-table-column');
require('./prototypes/tabs/n-tabs');
require('./prototypes/tabs/n-tabs-item');
require('./prototypes/tags/n-tags');
require('./prototypes/tags/n-tags-item');
require('./prototypes/timepicker/n-timepicker');
require('./prototypes/transfer/n-transfer');

export default {

    name: 'NBuilder',

    props: {

        modelValue: {
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

        model: {
            default()
            {
                return {};
            },
            type: [Object]
        },

        renderDemo: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        renderExport: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

    },

    data()
    {
        return {
            init: false, demo: false, collapse: [], safevar: this.normalizeModel(this.modelValue)
        };
    },

    watch: {
        modelValue: function () {
            this.safevar = this.normalizeModel(this.modelValue)
        }
    },

    mounted()
    {
        this.init = true;
    },

    methods: {

        exportJson(value)
        {
            return JSON.stringify(Obj.clone(value), null, 4).replace(/"!FUNC:(.*?):FUNC!"/g, (matches) => {
                return matches.replace(/^"!FUNC:/, '').replace(/:FUNC!"$/, '').replace(/\\"/, '"').replace(/\\n/g, "\n");
            });
        },

        exportExecutable(value)
        {
            return new Function(`return ${this.exportJson(value)};`)();
        },

        normalizeModel(model)
        {
            let result = {};

            Obj.each(model, (value, key) => {
                result[key] = Obj.assign(this.normalizeChild(value), {
                    order: (Any.vals(result).length + 1) * 100
                });
            });

            return result;
        },

        normalizeChild(child)
        {
            let result = this.applyProps(null, {
                ...Obj.except(child, ['content']), content: {}, builder: this.buildProps(child),
            });

            Obj.each(child.content || {}, (value, key) => {

                if ( ! key.match(':') ) {
                    key += ':' + UUID();
                }

                result['content'][key] = Obj.assign(this.normalizeChild(value), {
                    order: (Any.vals(result['content']).length + 1) * 100
                });
            });

            return result;
        },

        getOriginalValue(prop)
        {
            let safevalue = prop.value;

            if ( typeof prop.value === 'function' ) {
                safevalue = btoa("!FUNC:" + prop.value.toString() + ":FUNC!");
            }

            return safevalue;
        },

        getSafeValue(prop)
        {
            let safevalue = '';

            if ( typeof prop.value === 'string' ) {
                safevalue = Any.string(prop.value);
            }

            if ( typeof prop.value === 'boolean' ) {
                safevalue = Any.string(prop.value);
            }

            if ( typeof prop.value === 'number' ) {
                safevalue = Any.string(prop.value);
            }

            if ( typeof prop.value === 'object' ) {
                safevalue = JSON.stringify(prop.value);
            }

            if ( typeof prop.value === 'function' ) {
                safevalue = btoa("!FUNC:" + prop.value.toString() + ":FUNC!");
            }

            return safevalue;
        },

        getRealValue(prop)
        {
            let realvalue = '';

            if ( prop.code === 'string' ) {
                realvalue = Any.string(prop.value);
            }

            if ( prop.code === 'boolean' ) {
                realvalue = Any.boolean(prop.value);
            }

            if ( prop.code === 'number' ) {
                realvalue = Any.number(prop.value, 0);
                console.log('num', prop.value, realvalue)
            }

            if ( prop.code === 'object' ) {
                realvalue = JSON.parse(prop.value);
            }

            if ( prop.code === 'function' ) {
                realvalue = atob(prop.original);
            }

            return realvalue;
        },

        changeElement(key, update)
        {
            if ( Any.isEmpty(update) ) {
                return;
            }

            let newKey = key.replace(/^(.*?)([^\.]+):([^\.]+)$/, `$1${update}:$3`);

            let value = Obj.get(this, key, {});

            Obj.unset(this, key);
            Obj.set(this, newKey, value);

            this.collapse = Arr.each(this.collapse, (k) => {
                return k.replace(key, newKey);
            });
        },

        changeAlias(key, update)
        {
            if ( Any.isEmpty(update) ) {
                return;
            }

            let newKey = key.replace(/^(.*?)([^\.]+):([^\.]+)$/, `$1$2:${update}`);

            let value = Obj.get(this, key, {});

            Obj.unset(this, key);
            Obj.set(this, newKey, value);

            this.collapse = Arr.each(this.collapse, (k) => {
                return k.replace(key, newKey);
            });
        },

        applyProps(key = null, value = {})
        {
            if ( ! Any.isEmpty(key) ) {
                value = Obj.get(this, key, {});
            }

            let reset = [
                'vIf', 'vShow', 'classList', 'binds', 'attrs', 'props', 'on',
            ];

            Obj.each(reset, (prop) => {
                Obj.unset(value, prop);
            });

            Obj.each(value.builder || {}, (val) => {

                if ( Any.isEmpty(val.key) ) {
                    return;
                }

                let bindValue = {
                    value: val.value, fallback: null
                };

                if ( val.code === 'string' ) {
                    bindValue.fallback = Any.string(val.fallback || '');
                }

                if ( val.code === 'boolean' ) {
                    bindValue.fallback = Any.boolean(val.fallback || 'false');
                }

                if ( val.code === 'object' ) {
                    bindValue.fallback = JSON.parse(val.fallback || '{}');
                }

                if ( val.type === 'binds' ) {
                    return Obj.set(value, [val.type, val.key], bindValue);
                }

                let realvalue = '';

                try {
                    realvalue = this.getRealValue(val);
                } catch (e) {
                    if ( ! Any.isEmpty(val.value) ) {
                        console.error('Invalid JSON: ' + val.value);
                    }
                }

                if ( val.type === 'root' ) {
                    return Obj.set(value, val.key, realvalue);
                }

                if ( val.type === 'attrs' ) {
                    return Obj.set(value, [val.type, val.key], realvalue);
                }

                if ( val.type === 'props' ) {
                    return Obj.set(value, [val.type, val.key], realvalue);
                }

                if ( val.type === 'on' ) {
                    return Obj.set(value, [val.type, val.key], realvalue);
                }

            });

            if ( Any.isEmpty(key) ) {
                return value;
            }

            return Obj.set(this, key, value);
        },

        buildProps(el, key = null)
        {
            let builder = {};

            Obj.each(Obj.only(el, ['vIf', 'vShow', 'classList']), (value, sey) => {
                builder[UUID()] = {
                    type: 'root', code: typeof value, key: sey, value: this.getSafeValue({ value }), fallback: null, original: this.getOriginalValue({ value })
                };
            });

            Obj.each(Obj.get(el, `binds`, {}), (value, sey) => {

                let result = {
                    type: 'binds', code: typeof value, key: sey, fallback: null, original: this.getOriginalValue({ value })
                }

                if ( Any.isString(value) ) {
                    result.value = this.getSafeValue({ value });
                }

                if ( Any.isObject(value) ) {
                    Obj.assign(result, { value: this.getSafeValue(value), fallback: Obj.get(value, 'fallback', null) })
                }

                builder[UUID()] = result;
            });

            Obj.each(Obj.get(el, `props`, {}), (value, sey) => {
                builder[UUID()] = { type: 'props', code: typeof value, key: sey, value: this.getSafeValue({ value }), fallback: null, original: this.getOriginalValue({ value }) };
            });

            Obj.each(Obj.get(el, `attrs`, {}), (value, sey) => {
                builder[UUID()] = { type: 'attrs', code: typeof value, key: sey, value: this.getSafeValue({ value }), fallback: null, original: this.getOriginalValue({ value }) };
            });

            Obj.each(Obj.get(el, `on`, {}), (value, sey) => {
                builder[UUID()] = { type: 'on', code: typeof value, key: sey, value: this.getSafeValue({ value }), fallback: null, original: this.getOriginalValue({ value }) };
            });

            if ( Any.isEmpty(key) ) {
                return builder;
            }

            this.$nextTick(() => {
                 Obj.set(this, `${key}.builder`, builder);
            });

            return builder;
        },

        addProp(key)
        {
            let value = Obj.get(this, `${key}.builder`, {});

            Obj.set(value, UUID(), {
                type: 'props', code: 'string', key: '', value: '', fallback: null
            });

            Obj.set(this, `${key}.builder`, value);
        },

        removeProp(key, prop)
        {
            Obj.unset(this, `${key}.builder.${prop}`);

            this.applyProps(key);
        },

        collapseElement(key)
        {
            Arr.toggle(this.collapse, key);
        },

        addElement(key)
        {
            let value = Obj.get(this, key, {});

            Obj.set(value, 'div:' + UUID(), {
                order: (Any.vals(value).length + 1) * 100, props: { modelValue: '$scope.list' }, content: {}
            });

            Obj.assign(this, key, value);
        },

        removeElement(key)
        {
            Obj.unset(this, key);
        }

    },

    renderTools(el, value, key)
    {
        let rootProps = {
            //
        };

        rootProps['onDblclick'] = () => {
            this.collapseElement(key);
        };

        let collapseProps = {
            href: 'javascript:void(0)',
        };

        collapseProps['onClick'] = () => {
            this.collapseElement(key);
        };

        let addProps = {
            href: 'javascript:void(0)',
        };

        addProps['onClick'] = () => {
            this.addElement(`${key}.content`);
        };

        let removeProps = {
            href: 'javascript:void(0)',
        };

        removeProps['onClick'] = () => {
            this.removeElement(key);
        };

        return (
            <div class="n-builder__tools" {...rootProps}>
                <div class="n-builder__collapse">
                    <a {...collapseProps}><i class="fa fa-bars"></i></a>
                </div>
                <div class="n-builder__name">
                    {key.replace(/^.*?([^\.:]+):([^\.:]+)$/, '$1')}<span>{key.replace(/^.*?([^\.:]+):([^\.:]+)$/, '$2')}</span>
                </div>
                <div class="n-builder__add">
                    <a {...addProps}><i class="fa fa-plus"></i></a>
                </div>
                <div class="n-builder__remove">
                    <a {...removeProps}><i class="fa fa-trash"></i></a>
                </div>
            </div>
        );
    },

    renderProp(el, sub, key)
    {
        let group = key.replace(/^.*?([^\.]+):([^\.]+)$/, '$1')
        let value = Obj.get(this.$data, `${key}.builder.${sub}`, {});

        let props = Obj.clone(Obj.get(global.NanoBuilderIndexies, `${group}.props`, {}));

        props = Obj.assign({}, global.NanoBuilderProps, props);

        Obj.each(props, (prop, index) => {
            console.log(prop.for, index, value.type)
            if ( ! Any.isEmpty(prop.for) && ! Arr.has(prop.for, value.type) ) {
                props = Obj.unset(props, index);
            }
        });

        console.log(props);

        let typeProps = {
            size: 'sm', options: global.NanoBuilderPropType
        };

        typeProps['onUpdate:modelValue'] = () => {
            this.applyProps(key);
        };

        let keyProps = {
            size: 'sm', allowCreate: true, options: props, optionsLabel: '$index'
        };

        keyProps['onUpdate:modelValue'] = () => {
            this.$nextTick(() => this.applyProps(key));
        };

        let codeProps = {
            size: 'sm', options: global.NanoBuilderPropCode
        };

        codeProps['onUpdate:modelValue'] = () => {
            this.$nextTick(() => this.applyProps(key));
        };

        let values = Obj.get(props, `${value.key}.options`, []);

        let valueInputProps = {
            size: 'sm', icon: 'fa fa-expand', iconDisabled: ! Arr.has(['string'], value.code)
        };

        valueInputProps['onBlur'] = () => {
            this.$nextTick(() => this.applyProps(key));
        };

        let valueHtml = (
            <NInput vModel={value.value} {...valueInputProps} />
        );

        let valueSelectProps = {
            size: 'sm', allowCreate: true, options: values
        };

        if ( Any.isArray(values) ) {
            valueSelectProps.optionsLabel = '$value';
            valueSelectProps.optionsValue = '$value';
        }

        valueSelectProps['onUpdate:modelValue'] = () => {
            this.$nextTick(() => this.applyProps(key));
        };

        if ( ! Any.isEmpty(values) && value.type === 'props' ) {
            valueHtml = (
                <NSelect {...valueSelectProps} vModel={value.value} />
            );
        }

        let fallbackProps = {
            size: 'sm', minRows: 1, autoRows: true
        };

        fallbackProps['onBlur'] = () => {
            this.$nextTick(() => this.applyProps(key));
        };

        let tooltipHtml = (
            <div class="n-builder_prop-text">
                <p>{Obj.get(props, `${value.key}.desc`, '')}</p>
            </div>
        );

        return (
            <div class="n-builder_prop">
                <div class="n-builder_prop-type">
                    <NSelect vModel={value.type} {...typeProps} />
                </div>
                <div class="n-builder_prop-key">
                    <NSelect vModel={value.key} {...keyProps} />
                </div>
                <div class="n-builder_prop-func">
                    <NSelect vModel={value.code} {...codeProps} />
                </div>
                <div class="n-builder_prop-value">
                    {valueHtml}
                </div>
                <div class="n-builder_prop-fallback">
                    <NInput vModel={value.fallback} {...fallbackProps} />
                </div>
                <div class="n-builder_prop-button">
                    <NButton size="sm" type="danger" onClick={() => this.removeProp(key, sub)}>Remove</NButton>
                </div>
            </div>
        )
    },

    renderProps(el, value, key)
    {
        if ( !Arr.has(this.collapse, key) ) {
            return null;
        }

        let elementProps = {
            options: global.NanoBuilderTypes, allowCreate: true, modelValue: key.replace(/^.*?([^\.]+):([^\.]+)$/, '$1'),
        };

        elementProps['onUpdate:modelValue'] = (value) => {
            this.changeElement(key, value);
        };

        let aliasProps = {
            modelValue: key.replace(/^.*?([^\.]+):([^\.]+)$/, '$2'),
        };

        aliasProps['onBlur'] = (e) => {
            this.changeAlias(key, e.target.value);
        };

        let addProps = {
            type: 'primary', size: 'sm', link: true
        };

        addProps['onClick'] = () => {
            this.addProp(key, value);
        };

        let props = Obj.get(value, `builder`);

        if ( ! Obj.has(value, 'builder') ) {
            props = this.buildProps(el, key, value);
        }

        return (
            <NForm class="n-builder__props">
                <NFormItem class="n-builder__element-type" label={this.trans('Type')}>
                    <NSelect {...elementProps} />
                </NFormItem>
                <NFormItem class="n-builder__element-alias" label={this.trans('Alias')}>
                    <NInput {...aliasProps} />
                </NFormItem>
                <div class="n-builder__element-prop">
                    <NButton {...addProps}>Add property</NButton>
                </div>
                <div class="n-builder__element-list">
                    {Arr.each(props, (prop, sub) => this.ctor('renderProp')(el, sub, key))}
                </div>
            </NForm>
        );
    },

    renderElement(el, value, key)
    {
        let classList = [
            'n-builder__element'
        ];

        if ( Arr.has(this.collapse, key) ) {
            classList.push('is-open');
        }

        return (
            <div class={classList}>
                {this.ctor('renderTools')(el, value, key)}
                {this.ctor('renderProps')(el, value, key)}
                {this.ctor('renderBuilder')(value.content || {}, `${key}.content`)}
            </div>
        );
    },

    renderBuilder(el, key)
    {
        if ( Any.isEmpty(el) ) {
            return null;
        }
        return (
            <div class="n-builder__frame">
                {Arr.each(Obj.sort(Obj.clone(el), 'order'), (v) => this.ctor('renderElement')(Obj.get(this.$data, key, {}), Obj.get(this.$data, [key, v._key], {}), `${key}.${v._key}`))}
            </div>
        );
    },

    renderBody()
    {
        return (
            <div class="n-builder__body">
                {this.ctor('renderBuilder')(this.safevar, 'safevar')}
            </div>
        );
    },

    renderHead()
    {
        let addProps = {
            type: 'primary'
        };

        addProps['onClick'] = () => {
            this.addElement('safevar');
        };

        let addHtml = (
            <div class="n-builder__head-add">
                <NButton {...addProps}>{this.trans('Add root element')}</NButton>
            </div>
        );

        let demoProps = {
            type: 'primary'
        };

        demoProps['onClick'] = () => {
            this.demo = true;
        };

        let demoHtml = (
            <div class="n-builder__head-demo">
                <NButton {...demoProps}>{this.trans('Render demo')}</NButton>
            </div>
        );

        return (
            <div class="n-builder__head">
                {[addHtml, demoHtml]}
            </div>
        );
    },

    renderOutput()
    {
        return (
            <div class="n-builder__output">
                <pre>{this.exportJson(this.safevar)}</pre>
            </div>
        );
    },

    renderDemo()
    {
        if ( ! this.renderDemo || ! this.demo ) {
            return null;
        }

        let modalProps = {
            width: '100%',
            height: '100%'
        };

        let configProps = {
            modelValue: this.model, scope: this.scope, config: this.exportExecutable(this.safevar)
        };

        return (
            <NModal vModel={this.demo} {...modalProps}>
                <NForm>
                    <NConfigNext {...configProps} />
                </NForm>
            </NModal>
        );
    },

    render()
    {
        let classList = [
            'n-builder',
        ];

        return (
            <div class={classList}>
                {[
                    this.ctor('renderBody')(), this.ctor('renderHead')(), this.ctor('renderOutput')(), this.ctor('renderDemo')(),
                ]}
            </div>
        );
    }
}
