import { Any, Arr, Dom, Locale, Obj, UUID } from "@kizmann/pico-js";

window.NConfirmIcons = {
    primary: window.nano.Icons.info,
    secondary: window.nano.Icons.info,
    success: window.nano.Icons.success,
    warning: window.nano.Icons.warning,
    danger: window.nano.Icons.danger,
    info: window.nano.Icons.info
};

export class ConfirmModule
{
    static alias = 'Confirm';

    modal = null;

    options = {
        text: '', size: 'md', type: 'primary', confirmText: '', cancelText: ''
    };

    static make(options = {}, cb = () => false)
    {
        return new ConfirmModule(options).promise(cb);
    }

    constructor(options = {})
    {
        this.options = Obj.assign(this.options, options);
    }

    close(next)
    {
        this.unbindEvents();
        this.modal.remove();

        Dom.find(document.body).css({
            'overflow': 'undefined'
        });

        next();
    }

    promise(cb = () => false)
    {
        return new Promise((confirm, cancel) => {

            if ( cb.apply({}) ) {
                return confirm();
            }

            let args = [
                () => this.close(confirm),
                () => this.close(cancel),
            ];

            this.render(...args);
        });
    }

    renderIcon(el)
    {
        let icon = Obj.get(window.NConfirmIcons,
            this.options.type, 'fa fa-ghost');

        let child = Dom.make('div', {
            classList: 'n-confirm__icon', innerHTML: `<i class="${icon}"></i>`
        });

        child.appendTo(el);
    }

    renderText(el)
    {
        let child = Dom.make('div', {
            classList: 'n-confirm__text', innerHTML: `<p>${this.options.text}</p>`
        });

        child.appendTo(el);
    }

    renderConfirm(el, next)
    {
        let classList = [
            'n-button',
            'n-button--confirm',
            'n-button--' + this.options.size,
        ];

        let text = Obj.get(this.options, 'confirmText');

        if ( Any.isEmpty(text) ) {
            text = Locale.trans('Okay');
        }

        let confirm = Dom.make('button', {
            classList: classList.join(' '), innerHTML: `<span>${text}</span>`
        });

        confirm.on('click', () => {
            next();
        });

        confirm.appendTo(el);
    }

    renderCancel(el, next)
    {
        let classList = [
            'n-button',
            'n-button--cancel',
            'n-button--' + this.options.size,
        ];

        let text = Obj.get(this.options, 'cancelText');

        if ( Any.isEmpty(text) ) {
            text = Locale.trans('Cancel');
        }

        let confirm = Dom.make('button', {
            classList: classList.join(' '), innerHTML: `<span>${text}</span>`
        });

        confirm.on('click', () => {
            next();
        });

        confirm.appendTo(el);
    }

    bindEvents(confirm, cancel)
    {
        let uid = Dom.find(this.modal).attr('data-confirm');

        Dom.find(window).on('keydown', (e) => {
            if ( e.keyCode === 27 ) {
                e.stopPropagation(); cancel();
            }
            if ( e.keyCode === 13 ) {
                e.preventDefault(); confirm();
            }
        }, { uid });

        Dom.find(window).on('click', (e) => {
            if ( Dom.find(e.target).inside('[data-confirm]') && ! Dom.find(e.target).inside('.n-confirm-frame') ) {
               cancel();
            }
        }, { uid });

        Any.delay(() => {
            Dom.find(this.modal).addClass('n-ready');
        });
    }

    unbindEvents()
    {
        let uid = Dom.find(this.modal).attr('data-confirm');

        Dom.find(window).off('keydown', null, {
            uid
        });

        Dom.find(window).off('click', null, {
            uid
        });
    }

    render(confirm, cancel)
    {
        let cls = Obj.get(this.options, 'class', []);

        console.log(this.options);

        if ( Any.isString(cls) ) {
            cls = cls.split(' ');
        }

        let classList = [
            'n-confirm',
            'n-confirm--' + this.options.size,
            'n-confirm--' + this.options.type,
        ];

        if ( window.WIN ) {
            classList.push('n-reverse');
        }

        let modal = Dom.make('div', {
            classList: Arr.merge(classList, cls).join(' ')
        });

        modal.attr('data-confirm', UUID());

        let frame = Dom.make('div', {
            classList: ['n-confirm-frame']
        });

        frame.appendTo(modal);

        let body = Dom.make('div', {
            classList: ['n-confirm__body']
        });

        body.appendTo(frame);

        this.renderIcon(body);
        this.renderText(body);

        let action = Dom.make('div', {
            classList: ['n-confirm__action']
        });

        action.appendTo(frame);

        this.renderCancel(action, cancel);
        this.renderConfirm(action, confirm);

        Dom.find(document.body).css({
            'overflow': 'hidden'
        });

        modal.appendTo(document.body);

        requestAnimationFrame(() => {
            this.bindEvents(confirm, cancel);
        });

        this.modal = modal.get(0);
    }
}

export default {
    ConfirmModule
}

if ( !window[ConfirmModule.alias] ) {
    window[ConfirmModule.alias] = ConfirmModule;
}