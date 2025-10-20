import { Any, Arr, Obj, Dom } from "@kizmann/pico-js";

window.NPreviewCacheGroups = {};

export class NPreviewHandler
{
    current = null;

    static append(item)
    {
        if ( !window.NPreviewCacheGroups[item.group] ) {
            window.NPreviewCacheGroups[item.group] = {};
        }

        window.NPreviewCacheGroups[item.group][item.uid] = item;
    }

    static remove(item)
    {
        delete window.NPreviewCacheGroups[item.group][item.uid];
    }

    static get(group)
    {
        if ( !window.NPreviewCacheGroups[group] ) {
            window.NPreviewCacheGroups[group] = {};
        }

        return Arr.sort(window.NPreviewCacheGroups[group], 'index');
    }

    static next()
    {
        if ( ! Any.isObject(this.current) ) {
            return null;
        }

        let items = NPreviewHandler.get(this.current.group);

        let index = Arr.findIndex(items, {
            uid: this.current.uid
        });

        let next = Arr.first(items);

        if ( items.length > index + 1 ) {
            next = Arr.get(items, index + 1);
        }

        return NPreviewHandler.switch(next);
    }

    static prev()
    {
        if ( ! Any.isObject(this.current) ) {
            return null;
        }

        let items = NPreviewHandler.get(this.current.group);

        let index = Arr.findIndex(items, {
            uid: this.current.uid
        });

        let prev = Arr.last(items);

        if ( 0 <= index - 1 ) {
            prev = Arr.get(items, index - 1);
        }

        return NPreviewHandler.switch(prev);
    }

    static create()
    {
        el = Dom.find('.n-preview-modal');

        if ( el.length() ) {
            return el;
        }

        let el = Dom.make('div', {
            classList: 'n-preview-modal'
        });

        el.attr('data-preview', 'nano');

        let close = Dom.make('div', {
            classList: 'n-preview-modal__close',
            innerHTML: `<i class="${nano.Icons.times}"></i>`
        });

        close.on('click', () => {
            NPreviewHandler.close()
        });

        close.appendTo(el);

        let prev = Dom.make('div', {
            classList: 'n-preview-modal__prev',
            innerHTML: `<i class="${nano.Icons.angleLeft}"></i>`
        });

        prev.on('click', () => {
            NPreviewHandler.prev()
        });

        prev.appendTo(el);

        let next = Dom.make('div', {
            classList: 'n-preview-modal__next',
            innerHTML: `<i class="${nano.Icons.angleRight}"></i>`
        });

        next.on('click', () => {
            NPreviewHandler.next()
        });

        next.appendTo(el);

        el.appendTo(document.body);

        return el;
    }

    static open(item)
    {
        let el = NPreviewHandler.create();

        el.css({
            'z-index': window.zIndex++
        });

        let keydownFn = (e) => {

            if ( e.keyCode === 27 ) {
                return NPreviewHandler.close();
            }

            if ( e.keyCode === 37 ) {
                return NPreviewHandler.prev();
            }

            if ( e.keyCode === 39 ) {
                return NPreviewHandler.next();
            }

        }

        Dom.find(window).on('keydown', keydownFn, {
            uid: 'n-preview-modal'
        });

        NPreviewHandler.switch(item);

        el.addClass('n-ready');
    }

    static close()
    {
        let el = NPreviewHandler.create();

        Dom.find(window).off('keydown', null, {
            uid: 'n-preview-modal'
        });

        NPreviewHandler.switch(null);

        el.removeClass('n-ready');
    }

    static switch(item)
    {
        if ( Any.isObject(this.current) ) {
            Obj.set(this.current, 'visible', false);
        }

        this.current = item;

        if ( Any.isObject(this.current) ) {
            Obj.set(this.current, 'visible', true);
        }

        return item;
    }

}

export default { NPreviewHandler }

if ( ! window.NPreviewHandler ) {
    window.NPreviewHandler = NPreviewHandler;
}