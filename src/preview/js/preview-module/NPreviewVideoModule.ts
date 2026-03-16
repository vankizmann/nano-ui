import { h } from "vue";
import { NPreviewHelper } from "../helper/NPreviewHelper.ts";

export const NPreviewVideoModule = ({ file, mime }) => {

    if ( mime === 'video/youtube' ) {
        return h('iframe', {
            src: `https://www.youtube.com/embed/${NPreviewHelper.youtube(file)}`
        });
    }

    if ( mime === 'video/vimeo' ) {
        return h('iframe', {
            src: `https://player.vimeo.com/video/${NPreviewHelper.vimeo(file)}`
        });
    }

    return h('video', { controls: true }, [
        h('source', { src: file, type: mime })
    ]);
};

export default NPreviewVideoModule;