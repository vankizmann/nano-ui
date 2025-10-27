import { UUID, Str, Obj, Dom, Any } from "@kizmann/pico-js";

window.NotificationBag = {};

export class NotificationHandler
{

    static alias = 'Notify';

    static notifications = {};

    static handle(...args)
    {
        let { uid, el } = this.create(undefined, ...args);

        let wrapper = this.element();

        // Append element to dom
        window.NotificationBag[uid].append(wrapper);

        // Queue remove
        Any.delay(() => {
            this.remove(uid);
        }, el.options.duration);

        return uid;
    }

    static create(uid = UUID(), ...args)
    {
        window.NotificationBag[uid] = new Notification(...args);

        return { uid, el: window.NotificationBag[uid] };
    }

    static remove(uid)
    {
        if ( window.NotificationBag[uid] === undefined ) {
            return;
        }

        // Remove dom element
        window.NotificationBag[uid].remove();

        // Remove from list
        delete window.NotificationBag[uid];
    }

    static element()
    {
        let el = Dom.find('.n-notification-frame');

        if ( !el.empty() ) {
            return el;
        }

        let classList = [
            'n-notification-frame',
            'n-notification-frame--' + window.nano.Settings.notifySize,
            'n-notification-frame--' + window.nano.Settings.notifyPosition,
        ];

        el = Dom.make('div', {
            classList: classList.join(' ')
        });

        el.appendTo(document.body);

        return el;
    }

}

export default NotificationHandler;
