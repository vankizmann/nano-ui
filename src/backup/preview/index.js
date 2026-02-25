import Preview from "./src/preview/preview.jsx";
import PreviewPlain from "./src/preview-plain/preview-plain.jsx";
import PreviewImage from "./src/preview-image/preview-image.jsx";
import PreviewVideo from "./src/preview-video/preview-video.jsx";
import PreviewModal from "./src/preview-modal/preview-modal.jsx";

import PreviewHelper from "./src/preview/preview-helper.mjs";
import PreviewHandler from "./src/preview/preview-handler.mjs";

window.DefaultPreviewMimes = {
    image: [
        'jpg', 'jpeg', 'gif', 'svg', 'png', 'bmp'
    ],
    video: [
        'mp4', 'webm', 'mov'
    ],
    audio: [
        'mp3', 'aac',
    ],
    font: [
        'woff', 'ttf', 'otf'
    ],
    text: [
        'csv', 'txt', 'html'
    ],
    application: [
        'pdf', 'doc', 'xls'
    ]
};

export default function (App) {

    if ( ! window.PreviewMimes ) {
        window.PreviewMimes = pi.Obj.assign(window.DefaultPreviewMimes, window.PreviewMimes);
    }

    let directives = [
        PreviewHelper, PreviewHandler
    ];

    pi.Arr.each(directives, (glob) => {
        App.config.globalProperties[glob.alias] = glob;
    });

    let components = [
        Preview, PreviewModal, PreviewPlain, PreviewImage, PreviewVideo
    ];

    pi.Arr.each(components, (comp) => {
        App.component(comp.name, comp);
    });

}

