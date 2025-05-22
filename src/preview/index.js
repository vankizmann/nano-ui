import Preview from "./src/preview/preview.jsx";
import PreviewPlain from "./src/preview-plain/preview-plain.jsx";
import PreviewImage from "./src/preview-image/preview-image.jsx";
import PreviewVideo from "./src/preview-video/preview-video.jsx";

export default function (App) {
    App.component(Preview.name, Preview);
    App.component(PreviewPlain.name, PreviewPlain);
    App.component(PreviewImage.name, PreviewImage);
    App.component(PreviewVideo.name, PreviewVideo);
}

