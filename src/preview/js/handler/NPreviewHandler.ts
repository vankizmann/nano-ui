import { Arr, Dom, Mix, Run } from "@kizmann/pico-js";
import { Pointer, Styler } from "../../../root/index.ts";
import NModalHandler from "../../../modal/js/handler/NModalHandler.ts";
import { NPreviewElement } from "./NPreviewElement.ts";

export class NPreviewHandler
{
    /**
     * @type {string}
     */
    static uid : string = 'NPreviewModal'

    /**
     * @type {boolean}
     */
    static blocked : boolean = false;

    /**
     * @type {Dom}
     */
    static root: Dom;

    /**
     * @type {Dom}
     */
    static frame: Dom;

    /**
     * @type {NPreviewElement}
     */
    static el : NPreviewElement;

    /**
     * @type {any}
     */
    static previews : NPreviewElement[] = [];

    static init() : NPreviewHandler
    {
        Pointer.bind(this.uid, 'mouseup', (e : any) => {
            Run.frame(() => this.backdrop(e));
        });

        Pointer.bind(this.uid, 'keyescape', (e : any) => {
            if ( this.el && e.which === 27 ) this.close();
        });

        Pointer.bind(this.uid, 'keydown', (e : any) => {
            if ( this.el && e.which === 37 ) this.prev();
            if ( this.el && e.which === 39 ) this.next();
        });

        return this;
    }

    static backdrop(e : any)
    {
        if ( ! this.el ) {
            return;
        }

        const tgt = this.frame.is(e.target);

        if ( !tgt ) {
            return;
        }

        this.close();
    }

    static append(config : any)
    {
        const { previews } = this;

        if ( config.index == null ) {
            config.index = previews.length * 10;
        }

        const preview = new NPreviewElement(config);

        Arr.append(previews, preview);

        return preview;
    }

    static remove({ uid } : any)
    {
        const preview = Arr.find(this.previews, { uid });

        if ( Mix.isEmpty(preview) ) {
            throw new Error('Preview not found with id: ' + Mix.str(uid));
        }

        if ( preview && preview.destroy ) {
            preview.destroy();
        }

        Arr.remove(this.previews, { uid });
    }

    static group(group : string) : NPreviewElement[]
    {
        const { previews } = this;

        const items = Arr.filter(previews, (item : any) => {
            return group === item.group;
        });

        return Arr.sort(items, 'index');
    }

    static open(node : NPreviewElement)
    {
        [this.root, this.frame] = [
            ...this.render()
        ];

        const items = this.group(node.group);

        if ( items.length > 1 ) {
            this.root.addClass('n-multi');
        }

        Pointer.prevent(...[
            this.uid, 'preview', this.uid
        ]);

        const zIndex = Pointer.zindex();

        this.root.style({
            'z-index': zIndex
        });

        NModalHandler.open(this.uid, zIndex);

        Run.frame(() => {
            this.root.addClass('n-ready');
        });

        const index = Arr.findIndex(...[
            items, { uid: node.uid }
        ]);

        this.el = Arr.get(items, index)
            .open(this.frame);

        this.root.appendTo(document.body);
    }

    static close()
    {
        if ( this.el ) {
            this.el.close();
        }

        if ( this.root ) {
            this.root.remove();
        }

        Pointer.release(this.uid);
        NModalHandler.close(this.uid);
    }

    static render(): [Dom, Dom]
    {
        const root = Dom.make('div', {
            class: 'n-preview-modal n-theme-dark',
        });

        const close = Dom.make('div', {
            class: 'n-preview-modal__close',
        });

        close.on('pointerdown', () => {
            this.close();
        });

        close.html(...[
            `<i class="${Styler.icon('times')}"></i>`
        ]);

        close.appendTo(root);

        const prev = Dom.make('div', {
            class: 'n-preview-modal__prev',
        });

        prev.on('pointerdown', () => {
            this.prev();
        });

        prev.html(...[
            `<i class="${Styler.icon('angle-left')}"></i>`
        ]);

        prev.appendTo(root);

        const next = Dom.make('div', {
            class: 'n-preview-modal__next',
        });

        next.on('pointerdown', () => {
            this.next();
        });

        next.html(...[
            `<i class="${Styler.icon('angle-right')}"></i>`
        ]);

        next.appendTo(root);

        const frame = Dom.make('div', {
            class: 'n-preview-modal__frame',
        });

        frame.appendTo(root);

        return [root, frame];
    }

    static next()
    {
        if ( this.blocked ) {
            return this;
        }

        const { index, group } = this.el;

        this.el.animate('left', () => {

            const items = this.group(group);

            const indexes = Arr.extract(...[
                items, 'index'
            ]);

            const target = Arr.findIndex(...[
                indexes, index
            ]);

            this.el = Arr.get(...[
                items, Arr.next(indexes, target)
            ]);

            Run.frame(() => {
                this.blocked = false;
            });

            this.el.focus().open(this.frame);
        });

        this.blocked = true;

        return this;
    }

    static prev()
    {
        if ( this.blocked ) {
            return this;
        }

        const { index, group } = this.el;

        this.el.animate('right', () => {

            const items = this.group(group);

            const indexes = Arr.extract(...[
                items, 'index'
            ]);

            const target = Arr.findIndex(...[
                indexes, index
            ]);

            this.el = Arr.get(...[
                items, Arr.prev(indexes, target)
            ]);

            Run.frame(() => {
                this.blocked = false;
            });

            this.el.focus().open(this.frame);
        });

        this.blocked = true;

        return this;
    }

}

if ( !globalThis.NPreviewHandler ) {
    globalThis.NPreviewHandler = NPreviewHandler.init();
}

export default NPreviewHandler;