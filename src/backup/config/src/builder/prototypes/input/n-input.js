import { Locale } from "@kizmann/pico-js";

window.NanoBuilderTypes['NInput'] = Locale.trans('NInput');

window.NanoBuilderIndexies['NInput'] = {
    childs: false, props: {}
};

window.NanoBuilderIndexies['NInput']['props'] = {
    modelValue: {
        for: ['binds', 'props'], default: null, type: 'String'
    },
    size: {
        for: ['binds', 'props'], default: 'md', type: 'String', options: window.NanoPrototypeSizes
    },
    type: {
        for: ['binds', 'props'], default: 'primary', type: 'String', options: window.NanoPrototypeTypes
    },
    disabled: {
        for: ['binds', 'props'], default: false, type: 'Boolean', options: window.NanoPrototypeBools
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
        for: ['binds', 'props'], default: null, type: 'Boolean', options: window.NanoPrototypeBools
    },
    iconClick: {
        for: ['on'], type: 'String'
    },
};