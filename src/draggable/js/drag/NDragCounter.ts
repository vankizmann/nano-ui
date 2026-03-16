import { Arr, Dom, Run } from "@kizmann/pico-js";

export class NDragCounter
{
    /**
     * @type {Dom}
     */
    static el : Dom;

    /**
     * @type {Dom}
     */
    static ghost : Dom;

    /**
     * @type {boolean}
     */
    static active : boolean;

    /**
     * @type {number[]}
     */
    static translate : number[] = [
        0, 0
    ];

    static init()
    {
        this.el = Dom.make('div', {
            class: 'n-drag-counter'
        });

        const style = [
            "position: fixed;",
            "top: -1px;",
            "left: -1px;",
            "width: 1px;",
            "height: 1px;",
        ];

        this.ghost = Dom.make('div', {
            style: style.join(' '),
        });

        Dom.ready(() => {
            this.el.appendTo(document.body);
            this.ghost.appendTo(document.body);
        });

        return this;
    }

    static remove()
    {
        this.active = false;

        let classList = [
            'n-drag-counter',
        ];

        this.el.attr('class', classList);

        return this;
    }

    static show(position : any, options : any = {})
    {
        if ( !position.x || !position.y ) {
            return this.remove();
        }

        if ( !this.active ) {
            Run.frame(() => this.active = true);
        }

        let classList = [
            'n-drag-counter',
        ];

        if ( this.active ) {
            Arr.append(classList, 'n-ready');
        }

        if ( options.mode ) {
            Arr.append(classList, 'n-mode-' + options.mode);
        }

        if ( options.type ) {
            Arr.append(classList, 'n-type-' + options.type);
        }

        let translate = [
            position.x + 'px',
            position.y + 'px',
        ];

        let style = {
            translate,
        };

        if ( ! this.active ) {
            this.el.style(style, false);
        }

        if ( ! Arr.matches(this.translate, translate) ) {
            Run.frame(() => this.el.style(style, false));
        }

        this.el.attr('class', classList);

        return this;
    }

    static create(event : any, options : any = {})
    {
        const data = event.dataTransfer;

        // Fix data transfer
        data.setData('text/plain', '');

        if ( typeof data.setDragImage !== 'function' ) {
            return;
        }

        data.setDragImage(this.ghost.el, 0, 0);

        if ( options.text ) {
            this.el.html(`<span>${options.text}</span>`);
        }

        return this;
    }

}

if ( !globalThis.NDragCounter ) {
    globalThis.NDragCounter = NDragCounter.init();
}

export default NDragCounter;