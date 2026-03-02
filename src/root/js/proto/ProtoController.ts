import { onUnmounted, inject, watch, computed, ComponentInternalInstance, getCurrentInstance, isRef, onBeforeUnmount, onMounted, ref, SetupContext } from "vue";
import { Run, Mix, Arr, Dom, Hash, Signal, Obj } from "@kizmann/pico-js";
import { ProtoData, ProtoView } from "../../index.ts";

export interface FakeInternalInstance extends ComponentInternalInstance
{
    ncx : ProtoController;
    setupState : Record<string, any>;
}

export class ProtoController
{
    /**
     * @type {FakeInternalInstance}
     */
    instance : FakeInternalInstance;

    /**
     * @type {SetupContext}
     */
    context : SetupContext;

    /**
     * @type {any}
     */
    props : any;

    scope : ProtoController;

    /**
     * @type {ProtoView}
     */
    view : ProtoView;

    /**
     * @type {ProtoData}
     */
    data : ProtoData;

    vals : object = {};

    /**
     * @type {object}
     */
    refs : object = {};

    /**
     @type {object}
     */
    signals : object = {};

    /**
     * @type {string}
     */
    uid : string;

    /**
     * @type {HTMLElement | null}
     */
    el : HTMLElement | null;

    constructor(props : object, context : SetupContext)
    {
        [this.props, this.context] = [
            props, context,
        ];
    }

    setup()
    {
        // @ts-ignore
        this.instance = getCurrentInstance();

        if ( !this.instance.ncx ) {
            this.instance.ncx = this;
        }

        this.scope = this;

        onMounted(() => {
            this.el = this.ref('el')?.value;
        });

        onMounted(() => {
            this.onMounted();
        });

        onUnmounted(() => {
            this.onUnmounted();
        });

        onBeforeUnmount(() => {
            Arr.each(this.signals, (v : any, k : string) => {
                this.offSignal(k);
            });
        });

        return this;
    }

    onMounted()
    {
        //
    }

    onUnmounted()
    {
        //
    }

    dispose(fn : Function)
    {
        onUnmounted(() => {
            Run.delay(fn, 2000);
        });
    }

    pass(keys : any = [])
    {
        Arr.each(keys, (fn: string, key : string) => {
            this.instance[key] = (...args : any[]) => this[fn](...args);
        });
    }

    unpack()
    {
        return {
            scope: this.scope,
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

    has(key : string)
    {
        return Mix.isUndef(this.vals[key]);
    }

    empty(key : string)
    {
        if ( !isRef(this.vals[key]) ) {
            return Mix.isEmpty(this.vals[key]);
        }

        return Mix.isEmpty(this.vals[key].value);
    }

    get(key : string, fallback : any = undefined)
    {
        if ( this.vals[key] === undefined ) {
            return this.prop(key, fallback);
        }

        if ( !isRef(this.vals[key]) ) {
            return this.vals[key] ?? fallback;
        }

        return this.vals[key].value;
    }

    set(key : string, value : any)
    {
        if ( !isRef(this.vals[key]) ) {
            return this.vals[key] = value;
        }

        return this.vals[key].value = value;
    }

    update(key : string, value : any)
    {
        this.context.emit(`update:${key}`, ...[
            this.set(key, value)
        ]);

        return this.get(key);
    }

    prop(key : string, fallback : any = null)
    {
        if ( !isRef(this.props[key]) ) {
            return this.props[key] ?? fallback;
        }

        return this.props[key].value;
    }

    ref(key : string, fallback : any = null)
    {
        return this.refs[key] ?? fallback;
    }

    ncx(key : string, fallback : any = null)
    {
        return this.refs[key]?.value?._?.ncx ?? fallback;
    }

    dom(key : string)
    {
        if ( this.refs[key]?.value?.$el ) {
            // @ts-ignore
            return Dom.make(this.refs[key].value.$el);
        }

        // @ts-ignore
        return Dom.make(this.refs[key]?.value);
    }

    emit(event : string, ...args : any[])
    {
        return this.context.emit(event, ...args);
    }

    injectRef(key : string | string[], fallback : any = null)
    {
        if ( Mix.isStr(key) ) {
            // @ts-ignore
            key = [key, key];
        }

        return this.refs[key[0]] = inject(key[1], fallback);
    }

    cloneProp(key : string, options : any = {})
    {
        this.vals[key] = ref(this.props[key]);

        if ( !Mix.isPrim(this.vals[key].value) ) {
            options.deep ??= true;
        }

        watch(() => this.props[key], (value) => {
            this.set(key, value);
        }, options);

        return this;
    }

    linkProp(key : string | string[], source : any = null, freeze : boolean = false)
    {
        if ( Mix.isStr(key) ) {
            // @ts-ignore
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

            if ( !freeze ) {
                return value;
            }

            return Object.freeze(value);
        };

        if ( !this.vals[key[0]] ) {
            this.vals[key[0]] = computed(fn);
        }

        return this;
    }

    watchProp(key : string, cb : Function, options : any = {})
    {
        if ( !Mix.isPrim(this.vals[key]?.value) ) {
            options.deep ??= true;
        }

        watch(() => this.props[key], (v) => {
            cb(v);
        }, options);

        return this;
    }

    watchData(key : string, cb : Function, options : any = {})
    {
        if ( !Mix.isPrim(this.vals[key]?.value) ) {
            options.deep ??= true;
        }

        watch(() => this.vals[key], (v) => {
            cb(v);
        }, options);

        return this;
    }

    makeLinkData(key : string, source : any, cb : Function, options : any = {})
    {
        this.vals[key] = ref(cb());

        watch(() => this.vals[source], () => {
            this.vals[key].value = cb();
        }, options);

        return this;
    }

    makeLinkProp(key : string, source : any, cb : Function, options : any = {})
    {
        this.vals[key] = ref(cb());

        watch(() => this.props[source], () => {
            this.vals[key].value = cb();
        }, options);

        return this;
    }

    compData(key : string, cb : Function)
    {
        this.vals[key] = computed(() => {
            return cb.call(this);
        });

        return this;
    }

    makeData(key : string, value : any = null)
    {
        this.vals[key] = ref(value);

        return this;
    }

    exposeData(key : string)
    {
        this.instance.setupState = {
            ...this.instance.setupState ?? {}, [key]: this.vals[key]
        };

        return this;
    }

    makeRef(key : string)
    {
        this.refs[key] = ref(null);

        return this;
    }

    makeUID()
    {
        this.uid = this.prop('uid') ?? Hash.uuid();
    }

    passProps(value : any, keys : string[] = [])
    {
        Arr.each(keys, (key) => {
            value[key] = this.get(key);
        });

        return value;
    }

    onSignal(event : string, cb : Function)
    {
        const uid = Hash.uuid();
        Signal.bind(event, cb, { uid });
        this.signals[uid] = event;
    }

    offSignal(uid : string)
    {
        if ( this.signals[uid] ) {
            Signal.unbind(this.signals[uid], { uid });
        }
    }

    fireSignal(event : string, ...args : any[])
    {
        Signal.fire(event, ...args);
    }

    applyClear()
    {
        const clearValue = Obj.clone(...[
            this.data.clearValue
        ]);

        this.update('modelValue', clearValue);
    }

    get attrs()
    {
        return this.context.attrs;
    }

}

export default ProtoController;