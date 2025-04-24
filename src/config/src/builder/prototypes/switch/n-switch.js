import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['NSwitch'] = Locale.trans('NSwitch');

global.NanoBuilderIndexies['NSwitch'] = {
    childs: true, props: {}
};

global.NanoBuilderIndexies['NSwitch']['props'] = {
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
        for: ['binds', 'props'], type: 'String', options: global.NanoPrototypeTypes
    },
    offType: {
        for: ['binds', 'props'], type: 'String', options: global.NanoPrototypeTypes
    },
    size: {
        for: ['binds', 'props'], type: 'String', options: global.NanoPrototypeSizes
    },
    disabled: {
        for: ['binds', 'props'], type: 'Boolean', options: global.NanoPrototypeBools
    },
};