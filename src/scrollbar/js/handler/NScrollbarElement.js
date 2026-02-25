import { Dom, Hash, Obj, Run } from "@kizmann/pico-js";
import NScrollbarHelper from "./NScrollbarHelper.js";

export class NScrollbarElement
{

    native;
    observer;

    el;
    cl;
    wl;

    sbar;
    hbar;
    vbar;

    width = - 1;
    height = - 1;

    buffer = {};

    options = {
        uid: null,
        bem: 'n-scrollbar',
        overflowX: true,
        overflowY: true,
        scrollPortal: false,
        onReady: () => null,
        onUpdate: () => null,
    }

    constructor(el, options = {})
    {
        this.native = NScrollbarHelper.native;

        if ( !options.uid ) {
            options.uid = Hash.uuid();
        }

        this.options = {
            ...this.options, ...options
        };

        this.el = Dom.find(el);
        this.cl = Dom.find(this.el.childs()[0]);
        this.wl = Dom.find(this.cl.childs()[0]);

        if ( this.native ) {
            this.el.addClass(`${this.options.bem}--native`);
        }

        if ( this.native ) {
            //this.el.addClass(`${this.options.bem}--forced`);
        }

        this.makePseudo();
        this.detectRect();
        this.observeBox();

        this.options.onReady({
            target: this.cl.el,
        });
    }

    destroy()
    {
        this.cl.off('scroll');
        this.sbar.el.remove();
        this.hbar.off('mousedown');
        this.hbar.el.remove();
        this.vbar.off('mousedown');
        this.vbar.el.remove();
        this.observer.disconnect();
    }

    makePseudo()
    {
        const { bem, overflowX, overflowY, scrollPortal } = this.options;

        const fn = Run.framerate(() => {
            this.adaptBars();
            this.fireScroll();
        }, 24);

        let portal = this.el;

        if ( scrollPortal ) {
            portal = this.el.parent().upnode('.n-scrollbar');
        }

        this.cl.on('scroll', fn, {
            passive: true
        });

        this.cl.on('wheel', fn, {
            passive: true
        });

        this.sbar = Dom.make('div', {
            class: `${bem}-spacer`
        });

        this.sbar.appendTo(this.el);

        this.hbar = Dom.make('div', {
            class: `${bem}-h`,
        });

        this.hbar.on('mousedown', (e) => {
            this.onMousedown(e, 'width', this.hbar);
        });

        if ( overflowX ) {
            this.hbar.appendTo(portal);
        }

        this.vbar = Dom.make('div', {
            class: `${bem}-v`
        });

        this.vbar.on('mousedown', (e) => {
            this.onMousedown(e, 'height', this.vbar);
        });

        if ( overflowY ) {
            this.vbar.appendTo(portal);
        }
    }

    fireScroll()
    {
        Dom.find(window).fire('virtualscroll', {
            target: this.cl.el,
        });
    }

    returnRect()
    {
        this.el.addClass('is-paused');

        const rect = Obj.only(this.wl.rect(), [
            'width', 'height',
        ]);

        this.el.remClass('is-paused');

        return rect;
    }

    equalRect(rect)
    {
        const { width, height } = this;

        [this.width, this.height] = [
            rect.width, rect.height
        ];

        if ( width !== rect.width ) {
            return false;
        }

        if ( height !== rect.height ) {
            return false;
        }

        return true;
    }

    detectRect()
    {
        const { overflowX, overflowY } = this.options;

        const rect = Dom.find(this.sbar).actual(() => {
            return this.returnRect();
        });

        if ( !this.equalRect(rect) ) {
            Run.async(() => this.adaptBars());
        }

        if ( ! overflowX ) {
            delete rect.width;
        }

        if ( ! overflowY ) {
            delete rect.width;
        }

        this.sbar.style(rect);

        this.options.onUpdate({
            target: this.cl.el,
        });
    }

    adaptBars()
    {
        const { overflowX, overflowY, scrollPortal } = this.options;

        if ( this.native ) {
            // return this;
        }

        let portal = this.el;

        if ( scrollPortal ) {
            portal = this.el.parent().upnode('.n-scrollbar');
        }

        const yrect = {
            scroll: this.cl.el.scrollHeight,
            client: this.el.el.clientHeight,
        };

        yrect.scroll -= Dom.num(this.wl.computed('margin-bttom'));

        const hasy = yrect.client < yrect.scroll;

        if ( hasy ) {
            this.applyBar('height', this.vbar, yrect, portal);
        }

        if ( overflowY ) {
            portal.stateClass('has-vtrack', hasy);
        }

        const xrect = {
            scroll: this.cl.el.scrollWidth,
            client: this.el.el.clientWidth,
        };

        xrect.scroll -= Dom.num(this.wl.computed('margin-right'));

        const hasx = xrect.client < xrect.scroll;

        if ( hasx ) {
            this.applyBar('width', this.hbar, xrect, portal);
        }

        if ( overflowX ) {
            portal.stateClass('has-htrack', hasx);
        }
    }

    applyBar(key, el, rect, portal)
    {
        if ( el == null ) {
            return;
        }

        let size = (rect.client / rect.scroll) * rect.client;

        let min = Math.max(...[
            size, 50
        ]);

        let max = Math.ceil(...[
            (rect.client / rect.scroll) *
            (rect.scroll - rect.client)
        ]);

        let scroll = 0;

        if ( key === 'width' ) {
            scroll = this.cl.el.scrollLeft;
        }

        if ( key === 'height' ) {
            scroll = this.cl.el.scrollTop;
        }

        const ratio = (max - (min - size) - 10) / max;

        const offset = Math.ceil(...[
            (rect.client / rect.scroll) * scroll * ratio
        ]) || 0;

        let style = {
            [key]: (min = Math.ceil(min))
        };

        this.buffer[key] = {
            min, max, scroll, ratio, offset, rect
        };

        const port = this.el.offset(null, portal);

        if ( key === 'width' ) {
            style.translate = [offset + port.left + 'px', 0];
        }

        if ( key === 'height' ) {
            style.translate = [0, offset + port.top + 'px'];
        }

        Run.frame(() => {
            el.style(style);
        });
    }

    observeBox()
    {
        this.observer = new ResizeObserver(Run.debounce(() => {
            Run.async(() => this.detectRect());
        }, 50));

        this.observer.observe(this.wl.el);
    }

    onMousedown(e, key, el)
    {
        const { uid } = this.options;

        e.preventDefault();
        e.stopPropagation();

        if ( e.button !== 0 ) {
            return;
        }

        let store = {
            pos: 0, scroll: this.buffer[key].scroll
        };

        if ( key === 'width' ) {
            store.pos = e.clientX;
        }

        if ( key === 'height' ) {
            store.pos = e.clientY;
        }

        const doc = Dom.find(document.body);

        doc.on('mousemove', (e) => {
            this.onMousemove(e, key, store);
        }, { uid, passive: true });

        doc.once('mouseup', () => {
            doc.off('mousemove', { uid });
            el.remClass('is-active');
        });

        el.addClass('is-active');
    }

    onMousemove(e, key, { pos, scroll })
    {
        const {
            min, ratio, rect
        } = this.buffer[key];

        let newpos = 0;

        if ( key === 'width' ) {
            newpos = e.clientX;
        }

        if ( key === 'height' ) {
            newpos = e.clientY;
        }

        const calc = (rect.client / rect.scroll) *
            scroll * ratio;

        const rela = (newpos - pos) + calc;

        const result = rela / (rect.client - min - 10) *
            (rect.scroll - rect.client);

        if ( key === 'width' ) {
            Run.frame(() => this.cl.el.scrollLeft = result);
        }

        if ( key === 'height' ) {
            Run.frame(() => this.cl.el.scrollTop = result);
        }
    }

}
