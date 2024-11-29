import { Locale } from "@kizmann/pico-js";

global.NanoBuilderTypes['div'] = Locale.trans('div');

global.NanoBuilderIndexies['div'] = {
    childs: false, props: {}
};

global.NanoBuilderIndexies['div']['props'] = {
    classList: {
        type: 'String'
    },
};