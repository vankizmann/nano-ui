import { Locale } from "@kizmann/pico-js";

window.NanoBuilderTypes['NSwitch'] = Locale.trans('NSwitch');

window.NanoBuilderIndexies['NSwitch'] = {
    childs: true, props: {}
};

window.NanoBuilderIndexies['NSwitch']['props'] = {
    modelValue: {
        for: ['binds', 'props'], type: 'Any'
    },
    onValue: {
        for: ['binds', 'props'], type: 'Any'
    },
    offValue: {
        for: ['binds', 'props'], type: 'Any'
    },
    onType: {
        for: ['binds', 'props'], type: 'String', options: window.NanoPrototypeTypes
    },
    offType: {
        for: ['binds', 'props'], type: 'String', options: window.NanoPrototypeTypes
    },
    size: {
        for: ['binds', 'props'], type: 'String', options: window.NanoPrototypeSizes
    },
    disabled: {
        for: ['binds', 'props'], type: 'Boolean', options: window.NanoPrototypeBools
    },
};