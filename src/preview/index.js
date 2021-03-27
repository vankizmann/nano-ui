import Preview from './src/preview/preview';
import PreviewPlain from './src/preview-plain/preview-plain';
import PreviewImage from './src/preview-image/preview-image';
import PreviewVideo from './src/preview-video/preview-video';

export default function (App) {
    App.component(Preview.name, Preview);
    App.component(PreviewPlain.name, PreviewPlain);
    App.component(PreviewImage.name, PreviewImage);
    App.component(PreviewVideo.name, PreviewVideo);
}

