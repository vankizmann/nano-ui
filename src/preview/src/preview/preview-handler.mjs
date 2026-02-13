import { Mix, Arr, Obj, Dom } from "@kizmann/pico-js";

window.PreviewGroups = {};

export class PreviewHandler
{
    static alias = 'PreviewHandler';

    static current = null;

    static append(item)
    {
        if ( !window.PreviewGroups[item.group] ) {
            window.PreviewGroups[item.group] = {};
        }

        window.PreviewGroups[item.group][item.uid] = item;
    }

    static remove(item)
    {
        delete window.PreviewGroups[item.group][item.uid];
    }

    static get(group)
    {
        if ( !window.PreviewGroups[group] ) {
            window.PreviewGroups[group] = {};
        }

        return Arr.sort(window.PreviewGroups[group], 'index');
    }

    static next()
    {
        if ( ! Mix.isRef(this.current) ) {
            return null;
        }

        let items = this.get(this.current.group);

        let index = Arr.findIndex(items, {
            uid: this.current.uid
        });

        let next = Arr.first(items);

        if ( items.length > index + 1 ) {
            next = Arr.get(items, index + 1);
        }

        return this.switch(next);
    }

    static prev()
    {
        if ( ! Mix.isRef(this.current) ) {
            return null;
        }

        let items = this.get(this.current.group);

        let index = Arr.findIndex(items, {
            uid: this.current.uid
        });

        let prev = Arr.last(items);

        if ( 0 <= index - 1 ) {
            prev = Arr.get(items, index - 1);
        }

        return this.switch(prev);
    }

    static create()
    {
        let el = Dom.find('.n-preview-modal');

        if ( el.length() ) {
            return el;
        }

        let classList = [
            'n-preview-modal',
            'n-preview-modal--md',
            'n-preview-modal--primary',
            'n-theme--dark'
        ];

        el = Dom.make('div', {
            classList: classList.join(' ')
        });

        el.attr('data-preview', 'nano');

        let close = Dom.make('div', {
            classList: 'n-preview-modal__close',
            innerHTML: `<i class="${nano.Icons.times}"></i>`
        });

        close.on('click', () => {
            this.close()
        });

        close.appendTo(el);

        let prev = Dom.make('div', {
            classList: 'n-preview-modal__prev',
            innerHTML: `<i class="${nano.Icons.angleLeft}"></i>`
        });

        prev.on('click', () => {
            this.prev()
        });

        prev.appendTo(el);

        let next = Dom.make('div', {
            classList: 'n-preview-modal__next',
            innerHTML: `<i class="${nano.Icons.angleRight}"></i>`
        });

        next.on('click', () => {
            this.next()
        });

        next.appendTo(el);

        el.appendTo(document.body);

        return el;
    }

    static open(item)
    {
        let el = this.create();

        let keydownFn = (e) => {

            if ( e.keyCode === 27 ) {
                e.stopPropagation();
                return this.close();
            }

            if ( e.keyCode === 37 ) {
                e.stopPropagation();
                return this.prev();
            }

            if ( e.keyCode === 39 ) {
                e.stopPropagation();
                return this.next();
            }

        }

        Dom.find(window).on('keydown', keydownFn, {
            uid: 'n-preview-modal'
        });

        this.switch(item);

        if ( this.get(item.group).length > 1 ) {
            el.addClass('n-multi');
        }

        el.addClass('n-ready');
    }

    static close()
    {
        let el = this.create();

        Dom.find(window).off('keydown', null, {
            uid: 'n-preview-modal'
        });

        this.switch(null);

        el.remClass(['n-ready', 'n-multi']);
    }

    static switch(item)
    {
        if ( Mix.isRef(this.current) ) {
            Obj.set(this.current, 'visible', false);
        }

        this.current = item;

        if ( Mix.isRef(this.current) ) {
            Obj.set(this.current, 'visible', true);
        }

        return item;
    }

}

if ( ! window.PreviewHandler ) {
    window.PreviewHandler = PreviewHandler;
}

export default PreviewHandler;