import { UUID, Str, Obj, Dom } from "nano-js";

class Notification {

    el = null;

    text = '';

    icon = '';

    type = '';

    options = {
        duration: 3500,
        iconSuccess: 'fa fa-check-circle',
        iconWarning: 'fa fa-exclamation-circle',
        iconDanger: 'fa fa-times-circle',
        iconPrimary: 'fa fa-info-circle'
    };

    constructor(text, type = 'primary', options = {})
    {
        this.text = text;
        this.type = type;

        this.options = Obj.assign(this.options, options);

        this.render();
    }

    getIcon()
    {
        return Obj.get(this.options,
            'icon' + Str.ucfirst(this.type));
    }

    append(el = document.body)
    {
        this.el.appendTo(el);

        setTimeout(() => this.el.addClass('n-notification--active'), 100);

        return this;
    }

    remove()
    {
        this.el.get(0).remove();

        return this;
    }

    render()
    {
        let classList = [
            'n-notification',
            'n-notification--' + this.type
        ];

        this.el = Dom.make('div', {
            classList: classList.join(' ')
        });

        let icon = Dom.make('div', {
            classList: 'n-notification__icon'
        });

        icon.appendTo(this.el);

        let iconSpan = Dom.make('span', {
            classList: this.getIcon()
        });

        iconSpan.appendTo(icon);

        let text = Dom.make('div', {
            classList: 'n-notification__text'
        });

        text.html(this.text).appendTo(this.el);

    }

}

export default class Notify {

    static alias = 'Notify';

    static position = 'bottom-start';

    static notifications = {};

    static handle(...args)
    {
        let uid = Notify.create(undefined, ...args);

        let wrapper = Notify.getWrapper();

        // Append element to dom
        Notify.notifications[uid].append(wrapper);

        // Queue remove
        setTimeout(() => Notify.remove(uid),
            Notify.notifications[uid].options.duration);

        return uid;
    }

    static create(uid = UUID(), ...args)
    {
        Notify.notifications[uid] = new Notification(...args);

        return uid;
    }

    static remove(uid)
    {
        if ( Notify.notifications[uid] === undefined ) {
            return;
        }

        // Remove dom element
        Notify.notifications[uid].remove();

        // Remove from list
        delete Notify.notifications[uid];
    }

    static getWrapper()
    {
        let classList = [
            'n-notification__wrapper',
            'n-notification__wrapper--' + this.position
        ];

        if ( Dom.find('.n-notification__wrapper').empty() === true ) {
            Dom.make('div', { classList: classList.join(' ') }).appendTo(document.body);
        }

        return Dom.find('.n-notification__wrapper');
    }

}
