import { GroupController } from "../../../root/index.js";
import { NSelectProps } from "./NSelect.js";
import { NSelectView } from "./NSelectView.js";
import { onMounted } from "vue";
import { Arr, Locale, Mix, Obj, Run, Str } from "@kizmann/pico-js";
import { NSelectData } from "./NSelectData.js";

/**
 * @class NSelectController
 * @extends {GroupController<NSelectController, NSelectProps, NSelectView>}
 */
export class NSelectController extends GroupController
{
    /**
     * @type {PopoverElement}
     */
    popel;

    constructor(props, context)
    {
        super(props, context);

        [this.view, this.data] = [
            new NSelectView(this), new NSelectData(this),
        ];

        this.setup();
    }

    setup()
    {
        super.setup();

        this
            .cloneProp('modelValue')
            .cloneProp('clearValue')
            .linkProp('load')
            .linkProp('type')
            .linkProp('size')
            .linkProp('disabled')
            .linkProp('clearable')
            .linkProp('multiple')
            .linkProp('allowCreate')
            .linkProp('collapse')
            .linkProp('position')
            .linkProp('options')
            .linkProp('optionsValue')
            .linkProp('optionsLabel')
            .linkProp('placeholder')
            .linkProp('undefinedText')
            .linkProp('emptyText')
            .linkProp('collapseText');

        this
            .makeRef('el')
            .makeRef('input')
            .makeRef('scrollbar');

        this
            .makeData('search', '')
            .makeData('focus', 0)
            .makeData('index', 0);

        this.compData('virtuals', () => {
            return this.buildVirtuals();
        });

        this.compData('searched', () => {
            return this.buildSearched();
        });

        onMounted(() => {
            this.mounted();
        });

        return this;
    }

    mounted()
    {
        this.resetDisplay();
    }

    ready()
    {
        this.scrollToIndex();
    }

    buildVirtuals()
    {
        let options = this.data.options;

        if ( !Mix.isEmpty(this.childs) ) {
            options = this.childs;
        }

        let virtuals = Arr.each(options, (v, i) => {
            return this.extractValues(v, i);
        });

        let model = this.data.model;

        if ( !Mix.isArr(model) ) {
            model = model ? [model] : [];
        }

        let values = Arr.extract(virtuals, 'value');

        Arr.each(Arr.diff(model, values), (v) => {
            Arr.append(virtuals, this.extractValues(null, v));
        });

        return virtuals ?? [];
    }

    extractValues(value, index)
    {
        const { allowCreate, undefinedText } = this.data;

        const opt = {
            $value: value ?? index, $index: index,
        };

        if ( value == null && !allowCreate ) {
            opt.$value = Locale.trans(undefinedText);
        }

        return {
            value: Obj.get(opt, this.data.optionsValue),
            label: Obj.get(opt, this.data.optionsLabel),
        };
    }

    buildSearched()
    {
        const { data } = this.unpack();

        const searched = Arr.filter(data.virtuals, ({ label }) => {
            return Str.has(label, data.search);
        });

        return searched ?? [];
    }

    focusInput()
    {
        Run.frame(() => {
            this.ref('input')?.value?.focus();
        });
    }

    resetDisplay()
    {
        const { data } = this.unpack();

        const index = Arr.findIndex(data.virtuals, {
            value: Arr.first(data.model)
        }, 0);

        data.index = Math.max(0, index);
    }

    scrollToIndex(index = null)
    {
        const { data } = this.unpack();

        if ( index == null ) {
            index = data.index;
        }

        if ( index < 0 ) {
            index = data.searched.length - 1;
        }

        if ( index > data.searched.length - 1 ) {
            index = 0;
        }

        if ( index !== data.index ) {
            data.index = index;
        }

        this.ref('scrollbar')?.value?.$?.ncx.scrollTo(...[
            data.index
        ]);
    }

    onEnter()
    {
        const { data } = this.unpack();

        const slice = [
            data.searched, data.index
        ];

        let model = data.model;

        if ( data.searched.length ) {
            model = Arr.get(...slice)?.value;
        }

        if ( data.allowCreate ) {
            model = data.search || model;
        }

        if ( ! Mix.isEmpty(model) ) {
            data.model = model;
        }

        data.search = '';
    }

}

export default NSelectController;