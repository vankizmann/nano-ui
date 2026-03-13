import { h } from "vue";
import { Arr, Mix } from "@kizmann/pico-js";
import { ProtoView, Styler } from "../../../root/index.ts";
import { NPreviewController } from "./NPreviewController.ts";

export class NPreviewView extends ProtoView
{
    /**
     * @type {NPreviewController}
     */
    declare scope : NPreviewController;

    /**
     * @type {string}
     */
    bem : string = 'n-preview';

    resolve(type : string, scope : string = 'NPreviewModules')
    {
        if ( globalThis[scope][type] ) {
            return globalThis[scope][type];
        }

        return globalThis[scope]['text'];
    }

    default()
    {
        return this.body();
    }

    body() : any
    {
        let { scope, data } = this.scope;

        const display = {
            file: data.safeThumb,
            type: data.thumbType,
            mime: data.thumbMime,
        };

        const inTypes = Arr.has(...[
            data.previewTypes, display.type
        ]);

        if ( data.preview && !inTypes ) {
            display.type = 'text';
        }

        const classList = [
            `${this.bem}-${display.type}`,
            `${this.bem}-file-${data.fileType}`,
        ];

        if ( data.loaded ) {
            classList.push(`n-ready`);
        }

        const props : any = {
            ref: scope.ref('preview'),
            class: data.classList,
        };

        props.class = Arr.merge(...[
            props.class, classList,
        ]);

        props.onPointerup = (e) => {
            e.stopPropagation();
            if ( data.preview ) scope.openPreview();
        };

        const preview = this.preview({
            ...display, el: scope.rel('preview'), full: false
        });

        return h('div', props, [
            preview, this.hover(), this.title(), this.portal()
        ]);
    }

    portal() : any
    {
        let { scope, data } = this.scope;

        if ( !data.visible ) {
            return null;
        }

        const display = {
            file: data.safeFile,
            type: data.fileType,
            mime: data.fileMime,
        };

        let classList = [
            'n-preview-portal',
            `n-preview-portal-${display.type}`,
        ];

        if ( data.loaded ) {
            classList.push(`n-ready`);
        }

        let props : any = {
            ref: scope.ref('portal'),
            class: classList,
            style: 'display: none;'
        };

        const preview = this.preview({
            ...display, el: scope.rel('portal'), full: true
        });

        return h('div', props, [preview]);
    }

    preview(props : any) : any
    {
        let { scope, data } = this.scope;

        return h(this.resolve(props.type), {
            ...props, scope, data
        });
    }

    hover() : any
    {
        const { data } = this.scope;

        if ( !data.preview ) {
            return null;
        }

        return this.div('hover', [
            this.icon(Styler.icon(data.fileType, 'preview'))
        ]);
    }

    title() : any
    {
        let { scope, data } = this.scope;

        if ( Mix.isEmpty(data.title) ) {
            return null;
        }

        return this.div('title', [
            h('span', null, data.title)
        ]);
    }

    meta(fullscreen : boolean) : any
    {
        let { data } = this.scope;

        let slots = [
            this.mime()
        ];

        if ( fullscreen ) {
            slots.push(this.path());
        }

        if ( fullscreen ) {
            slots.push(this.link());
        }

        const props : any = {
            class: data.classPart('meta')
        };

        return h('ul', props, slots);
    }

    path() : any
    {
        let { data } = this.scope;

        if ( ! Mix.isStr(data.safeFile) ) {
            return null;
        }

        if ( !data.showPath ) {
            return null;
        }

        const props : any = {
            class: data.classPart('path')
        };

        return h('li', props, [data.safeFile]);
    }

    mime() : any
    {
        let { data } = this.scope;

        const props : any = {
            class: data.classPart('mime')
        };

        return h('li', props, [data.fileMime]);
    }

    link() : any
    {
        let { data } = this.scope;

        if ( ! Mix.isStr(data.safeFile) ) {
            return null;
        }

        if ( !data.showLink ) {
            return null;
        }

        const props : any = {
            class: data.classPart('link'),
        }

        const button : any = {
            href: data.safeFile,
            nativeType: 'a',
            target: '_blank',
        };

        const link = this.comp('n-button', button, () => [
            data.$linkText
        ]);

        return h('li', props, [link]);
    }

}

export default NPreviewView;