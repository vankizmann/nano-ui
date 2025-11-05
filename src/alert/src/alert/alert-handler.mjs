import { Any, Str, Obj, Dom, Locale, Arr, UUID } from "@kizmann/pico-js";


export class AlertHandler
{
    static alias = 'Alert';

    modal = null;

    options = {
        text: '', size: 'md', type: 'primary',
    };

    static make(text, type = 'primary', options = {})
    {
        options = {
            text, type
        };

        return new AlertHandler(options).render();
    }

    constructor(options = {})
    {
        this.options = Obj.assign(this.options, options, {
            uid: UUID(),
        });
    }

    close()
    {
        this.unbindEvents();
        this.modal.remove();

        Dom.find(document.body).css({
            'overflow': 'undefined'
        });
    }

    renderIcon(el)
    {
        let icon = Obj.get(window.AlertIcons, this.options.type, 'fa fa-ghost');

        let child = Dom.make('div', {
            classList: 'n-alert__icon', innerHTML: `<i class="${icon}"></i>`
        });

        child.appendTo(el);
    }

    renderText(el)
    {
        let child = Dom.make('div', {
            classList: 'n-alert__text', innerHTML: `<p>${this.options.text}</p>`
        });

        child.appendTo(el);
    }

    bindEvents()
    {
        let { uid } = this.options;

        Dom.find(window).on('keydown', (e) => {
            if ( e.keyCode === 27 ) {
                e.stopPropagation(); this.close();
            }
        }, { uid });

        Dom.find(this.modal).on('click', (e) => {
            if ( ! Dom.find(e.target).inside('.n-alert-frame') ) {
                this.close();
            }
        }, { uid });

        Any.delay(() => {
            Dom.find(this.modal).addClass('n-ready');
        });
    }

    unbindEvents()
    {
        let { uid } = this.options;

        Dom.find(window).off('keydown', null, {
            uid
        });

        Dom.find(this.modal).off('click', null, {
            uid
        });
    }

    render()
    {
        let cls = Obj.get(this.options, 'class', []);

        if ( Any.isString(cls) ) {
            cls = cls.split(' ');
        }

        let classList = [
            'n-alert',
            'n-alert--' + this.options.size,
            'n-alert--' + this.options.type,
        ];

        let modal = Dom.make('div', {
            classList: Arr.merge(classList, cls).join(' ')
        });

        let frame = Dom.make('div', {
            classList: ['n-alert-frame']
        });

        frame.appendTo(modal);

        let body = Dom.make('div', {
            classList: ['n-alert__body']
        });

        body.appendTo(frame);

        this.renderIcon(body);
        this.renderText(body);

        Dom.find(document.body).css({
            'overflow': 'hidden'
        });

        modal.appendTo(document.body);

        requestAnimationFrame(() => {
            this.bindEvents();
        });

        this.modal = modal.get(0);
    }
}

export default AlertHandler;
