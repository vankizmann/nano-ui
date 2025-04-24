import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['NFormGroup'] = Locale.trans('NFormGroup');

global.NanoBuilderIndexies['NFormGroup'] = {
    childs: true, props: {}
};

global.NanoBuilderIndexies['NFormGroup']['props'] = {
    label: {
        for: ['binds', 'props'], type: 'String'
    }
};