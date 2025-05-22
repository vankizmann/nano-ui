import { Locale } from "@kizmann/pico-js";

window.NanoBuilderTypes['NButton'] = Locale.trans('NButton');

window.NanoBuilderIndexies['NButton'] = {
    childs: false, props: {}
};

window.NanoBuilderIndexies['NButton']['props'] = {
    size: {
        for: ['binds', 'props'], type: 'String', options: window.NanoPrototypeSizes
    },
    type: {
        for: ['binds', 'props'], type: 'String', options: window.NanoPrototypeTypes
    },
    link: {
        for: ['binds', 'props'], type: 'Boolean', options: window.NanoPrototypeBools
    },
    square: {
        for: ['binds', 'props'], type: 'Boolean', options: window.NanoPrototypeBools
    },
    disabled: {
        for: ['binds', 'props'], type: 'Boolean', options: window.NanoPrototypeBools
    },
    icon: {
        for: ['binds', 'props'], type: 'String'
    },
    iconPosition: {
        for: ['binds', 'props'], type: 'String', options: ['before', 'after']
    },
    nativeType: {
        for: ['binds', 'props'], type: 'String', options: ['button', 'a', 'div']
    },
    click: {
        for: ['on'], type: 'String'
    }
};