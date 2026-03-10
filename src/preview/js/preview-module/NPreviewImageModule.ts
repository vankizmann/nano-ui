import { h, ref } from "vue";
import { Dom, Mix } from "@kizmann/pico-js";
import { NPreviewHelper } from "../helper/NPreviewHelper.ts";

export const NPreviewImageModule = ({ el, file }) =>
{
    const rel = ref(null);

    const image : any = {
        ref: rel,
    };

    NPreviewHelper.image(file, (value : string) => {
        rel?.value?.setAttribute('src', value);
    });

    image.onLoad = () => {
        Dom.find(el).addClass('n-ready');
    };

    image.onError = () => {
        Dom.find(el).addClass('n-error');
    };

    return h('img', image);
};

export default NPreviewImageModule;