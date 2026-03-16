import { ProtoData } from "../../../root/index.ts";
import { NPreviewController } from "./NPreviewController.ts";
import { NPreviewHelper } from "../helper/NPreviewHelper.ts";
import { Locale } from "@kizmann/pico-js";

export class NPreviewData extends ProtoData
{
    /**
     * @type {NPreviewController}
     */
    declare scope : NPreviewController;

    get classList() : string[]
    {
        let classList = [];

        return this.classRoot(classList);
    }

    get index(): number
    {
        return this.scope.get('index');
    }

    get group(): string
    {
        return this.scope.get('group');
    }

    get visible(): boolean
    {
        return this.scope.get('visible');
    }

    get loaded(): boolean
    {
        return this.scope.get('loaded');
    }

    get preview(): boolean
    {
        return this.scope.get('preview');
    }

    get previewTypes(): string[]
    {
        return this.scope.get('previewTypes');
    }

    get file(): any
    {
        return this.scope.get('file');
    }

    get thumb(): any
    {
        return this.scope.get('thumb');
    }

    get safeFile(): any
    {
        return this.file ?? this.thumb;
    }

    get safeThumb(): any
    {
        return this.thumb ?? this.file;
    }

    get fileType(): string
    {
        return NPreviewHelper.type(this.safeFile);
    }

    get thumbType(): string
    {
        return NPreviewHelper.type(this.safeThumb);
    }

    get fileMime(): string
    {
        return NPreviewHelper.mime(this.safeFile);
    }

    get thumbMime(): string
    {
        return NPreviewHelper.mime(this.safeThumb);
    }

    get title(): string
    {
        return this.scope.get('title');
    }

    get showPath(): boolean
    {
        return this.scope.get('showPath');
    }

    get showLink(): boolean
    {
        return this.scope.get('showLink');
    }

    get linkText() : string
    {
        return this.scope.get('linkText');
    }

    get $linkText() : string
    {
        return Locale.trans(this.linkText);
    }

}

export default NPreviewData;