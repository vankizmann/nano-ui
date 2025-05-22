import { Locale } from "@kizmann/pico-js";

window.NanoBuilderTypes['NFormItem'] = Locale.trans('NFormItem');

window.NanoBuilderIndexies['NFormItem'] = {
    childs: true, props: {}
};

window.NanoBuilderIndexies['NFormItem']['props'] = {
    label: {
        for: ['binds', 'props'], type: 'String'
    }
};