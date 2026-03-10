import { App } from "vue";
import NPreview from "./js/preview/NPreview.ts";

export default function (App : App) {
    App.component(NPreview.name, NPreview);
}

import NPreviewFileModule from "./js/preview-module/NPreviewFileModule.ts";
import NPreviewImageModule from "./js/preview-module/NPreviewImageModule.ts";
import NPreviewVideoModule from "./js/preview-module/NPreviewVideoModule.ts";

globalThis.NPreviewModules = {
    'text': NPreviewFileModule,
    'image': NPreviewImageModule,
    'video': NPreviewVideoModule,
};