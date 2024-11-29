import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['NInput'] = Locale.trans('NInput');

global.NanoBuilderIndexies['NInput'] = {
    childs: false, props: {}
};

global.NanoBuilderIndexies['NInput']['props'] = {
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
        for: ['binds', 'props'], type: 'Boolean', options: ['true', 'false']
    },
    placeholder: {
        for: ['binds', 'props'], type: 'String'
    },
    icon: {
        for: ['binds', 'props'], type: 'String'
    },
    iconClick: {
        for: ['on'], type: 'String'
    }
};