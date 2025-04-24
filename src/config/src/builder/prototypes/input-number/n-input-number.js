import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['NInputNumber'] = Locale.trans('NInputNumber');

global.NanoBuilderIndexies['NInputNumber'] = {
    childs: false, props: {}
};

global.NanoBuilderIndexies['NInputNumber']['props'] = {
    modelValue: {
        for: ['binds', 'props'], default: null, type: 'Number'
    },
    clearValue: {
        for: ['binds', 'props'], default: null, type: 'Number'
    },
    clearable: {
        for: ['binds', 'props'], default: false, type: 'Boolean', options: global.NanoPrototypeBools
    },
    min: {
        for: ['binds', 'props'], default: 0, type: 'Number'
    },
    max: {
        for: ['binds', 'props'], default: Number.MAX_VALUE, type: 'Number'
    },
    stepSize: {
        for: ['binds', 'props'], default: 1, type: 'Number'
    },
    precision: {
        for: ['binds', 'props'], default: 0, type: 'Number'
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
    format: {
        for: ['binds', 'props'], default: ':count', type: 'String'
    },
    decimals: {
        for: ['binds', 'props'], default: '.', type: 'String'
    },
};