import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['NSwitch'] = Locale.trans('NSwitch');

global.NanoBuilderIndexies['NSwitch'] = {
    childs: true, props: {}
};

global.NanoBuilderIndexies['NSwitch']['props'] = {
    modelValue: {
        for: ['binds', 'props'], type: 'String'
    },
    size: {
        for: ['binds', 'props'], type: 'String', options: ['xs', 'sm', 'md', 'lg']
    },
    type: {
        for: ['binds', 'props'], type: 'String', options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info']
    },
    disabled: {
        for: ['binds', 'props'], type: 'Boolean', options: {'1': 'true', '0': 'false'}
    }
};