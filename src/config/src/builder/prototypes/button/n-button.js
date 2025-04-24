import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['NButton'] = Locale.trans('NButton');

global.NanoBuilderIndexies['NButton'] = {
    childs: false, props: {}
};

global.NanoBuilderIndexies['NButton']['props'] = {
    size: {
        for: ['binds', 'props'], type: 'String', options: global.NanoPrototypeSizes
    },
    type: {
        for: ['binds', 'props'], type: 'String', options: global.NanoPrototypeTypes
    },
    link: {
        for: ['binds', 'props'], type: 'Boolean', options: global.NanoPrototypeBools
    },
    square: {
        for: ['binds', 'props'], type: 'Boolean', options: global.NanoPrototypeBools
    },
    disabled: {
        for: ['binds', 'props'], type: 'Boolean', options: global.NanoPrototypeBools
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