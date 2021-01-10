import { UUID, Str, Obj, Dom } from "nano-js";

class Notification {

    el = null;

    text = '';

    icon = '';

    type = '';

    options = {
        duration: 4500,
        iconPrimary: global.NanoIcons.info,
        iconSecondary: global.NanoIcons.info,
        iconSuccess: global.NanoIcons.success,
        iconWarning: global.NanoIcons.warning,
        iconDanger: global.NanoIcons.danger,
        iconInfo: global.NanoIcons.info
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

        setTimeout(() => this.el.addClass('n-active'), 100);

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
            classList: classList.join(' '), onclick: () => this.remove()
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

    static position = global.NanoStyles.notifyPosition;

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
        if ( ! window.zIndex ) {
            window.zIndex = 9000;
        }

        let style = {
            'z-index': window.zIndex + 100
        };

        let classList = [
            'n-notification-frame',
            'n-' + this.position
        ];

        if ( Dom.find('.n-notification-frame').empty() === true ) {
            Dom.make('div', { classList: classList.join(' ') }).appendTo(document.body);
        }

        Dom.find('.n-notification-frame').css(style);

        return Dom.find('.n-notification-frame');
    }

}
