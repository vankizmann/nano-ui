import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['NFormItem'] = Locale.trans('NFormItem');

global.NanoBuilderIndexies['NFormItem'] = {
    childs: true, props: {}
};

global.NanoBuilderIndexies['NFormItem']['props'] = {
    label: {
        for: ['binds', 'props'], type: 'String'
    }
};