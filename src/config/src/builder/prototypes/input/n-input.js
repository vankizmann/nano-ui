import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['NInput'] = Locale.trans('NInput');

global.NanoBuilderIndexies['NInput'] = {
    childs: false, props: {}
};

global.NanoBuilderIndexies['NInput']['props'] = {
    modelValue: {
        for: ['binds', 'props'], default: null, type: 'String'
    },
    size: {
        for: ['binds', 'props'], default: 'md', type: 'String', options: global.NanoPrototypeSizes
    },
    type: {
        for: ['binds', 'props'], default: 'primary', type: 'String', options: global.NanoPrototypeTypes
    },
    disabled: {
        for: ['binds', 'props'], default: false, type: 'Boolean', options: global.NanoPrototypeBools
    },
    placeholder: {
        for: ['binds', 'props'], default: '', type: 'String'
    },
    nativeType: {
        for: ['binds', 'props'], default: 'text', type: 'String', options: ['text', 'password', 'email']
    },
    icon: {
        for: ['binds', 'props'], default: '', type: 'String'
    },
    iconPosition: {
        for: ['binds', 'props'], default: 'before', type: 'String', options: ['before', 'after']
    },
    iconDisabled: {
        for: ['binds', 'props'], default: null, type: 'Boolean', options: global.NanoPrototypeBools
    },
    iconClick: {
        for: ['on'], type: 'String'
    },
};