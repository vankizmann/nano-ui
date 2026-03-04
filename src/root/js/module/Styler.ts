import { Obj } from "@kizmann/pico-js";

const ICONS_SIGNAL = {
    'default': 'fa fa-circle-check',
    'info': 'fa fa-circle-info',
    'success': 'fa fa-circle-check',
    'warning': 'fa fa-circle-exclamation',
    'danger': 'fa fa-circle-xmark',
};

const ICONS_DEFAULT = {
    'revert': 'fa fa-clock-rotate-left',
    'prev': 'fa fa-angle-left',
    'next': 'fa fa-angle-right',
    'check': 'fa fa-check',
    'angle-left': 'fa fa-angle-left',
    'angle-right': 'fa fa-angle-right',
    'angle-up': 'fa fa-angle-up',
    'angle-down': 'fa fa-angle-down',
    'search': 'fa fa-search',
    'times': 'fa fa-times',
    'minus': 'fa fa-minus',
    'clock': 'fa fa-clock',
    'calendar': 'fa fa-calendar-days',
    'duration': 'fa fa-stopwatch'
};

export class Styler
{
    static icons = {
        default: ICONS_DEFAULT,
        alert: ICONS_SIGNAL,
        confirm: ICONS_SIGNAL,
        notify: ICONS_SIGNAL,
    };

    static bem(bem : string, options : any = {}) : string[]
    {
        let classList = [bem];

        if ( options.theme ) {
            classList.push('n-theme-' + options.theme);
        }

        if ( options.type ) {
            classList.push('n-type-' + options.type);
        }

        if ( options.size ) {
            classList.push('n-size-' + options.size);
        }

        return classList;
    }

    static button(options : any = {}, bem : string = 'n-button') : string[]
    {
        let classList = this.bem(bem, options);

        if ( options.glass ) {
            classList.push(bem + '--glass');
        }

        if ( options.link ) {
            classList.push(bem + '--link');
        }

        return classList;
    }

    static icon(type : string, group: string = 'default', fallback : string = 'default') : string
    {
        if ( type == null ) {
            type = fallback;
        }

        if ( Obj.has(this.icons, [group, type]) ) {
            return Obj.get(this.icons, [group, type]);
        }

        return Obj.get(this.icons, [group, fallback]);
    }

    static wheel(index: number)
    {
        // TODO color wheel put in 30 get 12 if limit is 20
    }

}

export default Styler;