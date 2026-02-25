import { Arr, Dom, Num, Obj, Run } from "@kizmann/pico-js";

export class NDragIndicator {

    /**
     * @type {PicoDom}
     */
    static el;
    static style = {
        top: -1, left: -1, width: -1, height: -1
    };

    static init()
    {
        this.el = Dom.make('div', {
            class: 'n-drag-indicator'
        });

        Dom.ready(() => {
            this.el.appendTo(document.body);
        });

        return this;
    }

    static reset(parent = null)
    {
        this.style = {
            top: -1, left: -1, width: -1, height: -1
        };

        if ( parent == null ) {
            parent = document.body;
        }

        if ( !this.el.parent().is(parent) ) {
            this.el.appendTo(parent);
        }

        return this;
    }

    static update(options = {})
    {
        let classList = [
            'n-drag-indicator',
        ];

        if ( options.mode ) {
            Arr.append(classList, 'n-mode-' + options.mode);
        }

        if ( options.type ) {
            Arr.append(classList, 'n-type-' + options.type);
        }

        this.el.attr('class', classList);

        return this;
    }

    static remove()
    {
        this.el.style(null, false);

        let classList = [
            'n-drag-indicator',
        ];

        this.el.attr('class', classList);

        return this.reset()
    }

    static patch(options)
    {
        const target = Dom.find(options.target);

        if ( target.el == null ) {
            return this.remove();
        }

        let boundry = target.el.offsetParent;

        if ( boundry == null ) {
            boundry = document.body;
        }

        if ( this.el.parent().el !== boundry ) {
            this.reset(boundry);
        }

        let box = Obj.only(target.rect(), [
            'width', 'height'
        ]);

        if ( options.offset ) {
            box.width -= options.offset;
        }

        let offset = target.offset(null, boundry);

        if ( options.offset ) {
            offset.left += options.offset;
        }

        const style = {
            ...box, ...offset,
        };

        if ( Obj.matches(this.style, style) ) {
            return;
        }

        this.el.style(this.style = style);

        return this;
    }

    static show(options = {})
    {
        this.update(options).patch(options);

        return this;
    }

}

if ( ! globalThis.NDragIndicator ) {
    globalThis.NDragIndicator = NDragIndicator.init();
}