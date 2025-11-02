import { Dom, Obj } from "@kizmann/pico-js";

export class NotificationElement
{
    static alias = 'NotificationElement';

    el = null;

    options = {
        text: '', icon: '', type: 'primary', duration: 4500,
    };

    constructor(text, type = 'primary', options = {})
    {
        this.options = Obj.assign(this.options, options, {
            text, type
        });

        this.render();
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
            'n-notification--' + this.options.type
        ];

        this.el = Dom.make('div', {
            classList: classList.join(' ')
        });

        this.el.on('click', () => {
            this.remove();
        });

        let iconClass = Obj.get(window.NotifcationIcons,
            this.options.type, 'fa fa-ghost');

        let icon = Dom.make('div', {
            classList: 'n-notification__icon', innerHTML: `<i class="${iconClass}"></i>`
        });

        icon.appendTo(this.el);

        let text = Dom.make('div', {
            classList: 'n-notification__text', innerHTML: `<p>${this.options.text}</p>`
        });

        text.appendTo(this.el);
    }

}

if ( ! window[NotificationElement.alias] ) {
    window[NotificationElement.alias] = NotificationElement;
}

export default NotificationElement;