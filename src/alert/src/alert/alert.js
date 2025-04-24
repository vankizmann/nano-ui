import { Any, Str, Obj, Dom } from "@kizmann/pico-js";

class AlertFrame {

    el = null;

    text = '';

    icon = '';

    type = '';

    options = {
        iconPrimary: nano.Icons.info,
        iconSecondary: nano.Icons.info,
        iconSuccess: nano.Icons.success,
        iconWarning: nano.Icons.warning,
        iconDanger: nano.Icons.danger,
        iconInfo: nano.Icons.info
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

        Dom.find(document.body).on('keydown', (event) => {
            if ( event.which === 27 ) {
                this.remove();
            }
        }, 'n-alert');

        setTimeout(() => this.el.addClass('n-active'), 100);
    }

    remove()
    {
        Dom.find(document.body).off('keydown', null, 'n-alert');

        this.el.get(0).remove();
    }

    render()
    {
        let classList = [
            'n-alert-frame',
            'n-alert-frame--' + this.type,
            'n-alert-frame--' + Alert.size
        ];

        this.el = Dom.make('div', {
            classList: classList.join(' ')
        });

        let backdrop = Dom.make('div', {
            classList: 'n-alert-backdrop', onclick: () => this.remove()
        });

        backdrop.onClick = () => {
            this.remove();
        };

        backdrop.appendTo(this.el);

        let frame = Dom.make('div', {
            classList: 'n-alert'
        });

        frame.appendTo(this.el);

        let icon = Dom.make('div', {
            classList: 'n-alert__icon'
        });

        icon.appendTo(frame);

        let iconSpan = Dom.make('span', {
            classList: this.getIcon()
        });

        iconSpan.appendTo(icon);

        let text = Dom.make('div', {
            classList: 'n-alert__text'
        });

        text.html(this.text).appendTo(frame);
    }

}

export default class Alert {

    static alias = 'Alert';

    static size = nano.Settings.notifySize;

    static alert = null;

    static handle(...args)
    {
        if ( ! Any.isEmpty(Alert.alert) ) {
            Alert.alert.remove();
        }

        Alert.alert = new AlertFrame(...args);

        Alert.alert.append();

        return Alert;
    }

}
