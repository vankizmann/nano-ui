import { ComponentInternalInstance, SetupContext, isRef, ref, watch, inject, computed, getCurrentInstance, onUnmounted, onMounted, onBeforeUnmount, markRaw } from "vue";
import { Arr, Dom, Hash, Mix, Run, Signal } from "@kizmann/pico-js";

/**
 * @template NCX
 * @typedef {{ ncx: NCX, setupState: Record<string, any> }} FakeVueInstance
 */

/**
 * @template NCX, VIEW, DATA
 * @typedef {Object} BaseComponentUnpack
 * @property {NCX} scope
 * @property {VIEW} view
 * @property {DATA} data
 * @property {HTMLElement | null} el
 * @property {Record<string, any>} refs
 */

/**
 * @template NCX, PROPS, VIEW, DATA
 */
export class ProtoController
{
    /**
     * @type {ComponentInternalInstance | FakeVueInstance}
     */
    instance;

    /**
     * @type {SetupContext}
     */
    context;

    /**
     * @type {typeof PROPS}
     */
    props;

    /**
     * @type {VIEW}
     */
    view;

    /**
     * @type {DATA}
     */
    data;

    /**
     @type {Record<string, any>}
     */
    vals = {};

    /**
     * @type {Record<string, any>}
     */
    refs = {};

    /**
     @type {Record<string, any>}
     */
    signals = {};

    /**
     * @type {string}
     */
    uid;

    /**
     * @type {HTMLElement | null}
     */
    el;

    constructor(props, context)
    {
        [this.props, this.context] = [
            props, context,
        ];

        this.instance = getCurrentInstance();
    }

    setup()
    {
        if ( !this.instance.ncx ) {
            this.instance.ncx = this;
        }

        onMounted(() => {
            this.el = this.ref('el')?.value;
        });

        onBeforeUnmount(() => {
            Arr.each(this.signals, (v, k) => {
                this.offSignal(k);
            });
        });

        return this;
    }

    dispose(fn)
    {
        onUnmounted(() => {
            Run.delay(fn, 2000);
        });
    }

    pass(keys = [])
    {
        Arr.each(keys, (key) => {
            this.instance[key] = (...args) => this[key](...args);
        });
    }

    /**
     * @this {ProtoController<NCX,VIEW,DATA>}
     */
    unpack()
    {
        return {
            scope: this,
            el: this.el,
            view: this.view,
            data: this.data,
            refs: this.refs
        };
    }

    render()
    {
        return () => this.view.default();
    }

    has(key)
    {
        return Mix.isUndef(this.vals[key]);
    }

    empty(key)
    {
        if ( !isRef(this.vals[key]) ) {
            return Mix.isEmpty(this.vals[key]);
        }

        return Mix.isEmpty(this.vals[key].value);
    }

    get(key, fallback = undefined)
    {
        if ( this.vals[key] === undefined ) {
            return this.prop(key, fallback);
        }

        if ( !isRef(this.vals[key]) ) {
            return this.vals[key] ?? fallback;
        }

        return this.vals[key].value;
    }

    set(key, value)
    {
        if ( !isRef(this.vals[key]) ) {
            return this.vals[key] = value;
        }

        return this.vals[key].value = value;
    }

    update(key, value)
    {
        this.context.emit(`update:${key}`, ...[
            this.set(key, value)
        ]);

        return this.get(key);
    }

    prop(key, fallback = null)
    {
        if ( !isRef(this.props[key]) ) {
            return this.props[key] ?? fallback;
        }

        return this.props[key].value;
    }

    ref(key, fallback = null)
    {
        return this.refs[key] ?? fallback;
    }

    dom(key)
    {
        if ( this.refs[key]?.value?.$el ) {
            return Dom.make(this.refs[key].value.$el);
        }

        return Dom.make(this.refs[key]?.value);
    }

    emit(event, ...args)
    {
        return this.context.emit(event, ...args);
    }

    injectRef(key, fallback = null)
    {
        if ( Mix.isStr(key) ) {
            key = [key, key];
        }

        return this.refs[key[0]] = inject(key[1], fallback);
    }

    cloneProp(key, options = {})
    {
        this.vals[key] = ref(this.props[key]);

        if ( ! Mix.isPrim(this.vals[key].value) ) {
            options.deep ??= true;
        }

        watch(() => this.props[key], (value) => {
            this.set(key, value);
        }, options);

        return this;
    }

    linkProp(key, source = null, freeze = false)
    {
        if ( Mix.isStr(key) ) {
            key = [key, key];
        }

        if ( source == null ) {
            source = this.props;
        }

        if ( source.ncx?.vals ) {
            source = source.ncx.vals;
        }

        if ( isRef(source[key[1]]) ) {
            this.vals[key[0]] = source[key[1]];
        }

        const fn = () => {

            const value = source[key[1]];

            if ( ! freeze ) {
                return value;
            }

            return Object.freeze(value);
        };

        if ( !this.vals[key[0]] ) {
            this.vals[key[0]] = computed(fn);
        }

        return this;
    }

    watchProp(key, cb, options = {})
    {
        if ( ! Mix.isPrim(this.vals[key]?.value) ) {
            options.deep ??= true;
        }

        watch(() => this.props[key], (v) => {
            cb(v);
        }, options);

        return this;
    }

    watchData(key, cb, options = {})
    {
        if ( ! Mix.isPrim(this.vals[key]?.value) ) {
            options.deep ??= true;
        }

        watch(() => this.vals[key], (v) => {
            cb(v);
        }, options);

        return this;
    }

    makeLinkData(key, source, cb, options = {})
    {
        this.vals[key] = ref(cb());

        watch(() => this.vals[source], () => {
            this.vals[key].value = cb();
        }, options);

        return this;
    }

    makeLinkProp(key, source, cb, options = {})
    {
        this.vals[key] = ref(cb());

        watch(() => this.props[source], () => {
            this.vals[key].value = cb();
        }, options);

        return this;
    }

    compData(key, cb)
    {
        this.vals[key] = computed(() => {
            return cb.call(this);
        });

        return this;
    }

    makeData(key, value = null)
    {
        this.vals[key] = ref(value);

        return this;
    }

    exposeData(key)
    {
        this.instance.setupState = {
            ...this.instance.setupState ?? {}, [key]: this.vals[key]
        };

        return this;
    }

    makeRef(key)
    {
        this.refs[key] = ref(null);

        return this;
    }

    makeUID()
    {
        this.uid = this.prop('uid') ?? Hash.uuid();
    }

    passProps(value, keys = [])
    {
        Arr.each(keys, (key) => {
            value[key] = this.get(key);
        });

        return value;
    }

    onSignal(event, cb)
    {
        const uid = Hash.uuid();
        Signal.bind(event, cb, { uid });
        this.signals[uid] = event;
    }

    offSignal(uid)
    {
        if ( this.signals[uid] ) {
            Signal.unbind(this.signals[uid], { uid });
        }
    }

    fireSignal(event, ...args)
    {
        Signal.fire(event, ...args);
    }

    get attrs()
    {
        return this.context.attrs;
    }

}

export default ProtoController;