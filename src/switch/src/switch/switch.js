import { Obj, Any } from "nano-js";

export default {

    name: 'NSwitch',

    props: {

        value: {
            default()
            {
                return false;
            }
        },

        onValue: {
            default()
            {
                return true;
            }
        },

        offValue: {
            default()
            {
                return false;
            }
        },

        onType: {
            default()
            {
                return 'primary';
            }
        },

        offType: {
            default()
            {
                return null;
            }
        },

        size: {
            default()
            {
                return null;
            }
        },

        round: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

    },

    data()
    {
        return {
            veValue: this.value
        };
    },

    methods: {

        eventClick()
        {
            let veValue = this.onValue;

            if ( this.veValue === this.onValue ) {
                veValue = this.offValue;
            }

            this.$emit('input', this.veValue = veValue);
        }

    },

    watch: {

        value()
        {
            if ( this.value !== this.veValue ) {
                this.veValue = this.value;
            }
        }

    },

    renderSwitch()
    {
        let classList = [
            'n-switch',
        ];

        if ( this.size ) {
            classList.push('n-switch--' + this.size);
        }

        if ( this.round ) {
            classList.push('n-switch--round');
        }

        if ( this.veValue === this.onValue && this.onType ) {
            classList.push('n-switch--' + this.onType);
        }

        if ( this.veValue === this.offValue && this.offType ) {
            classList.push('n-switch--' + this.offType);
        }

        if ( this.veValue === this.onValue ) {
            classList.push('n-on');
        }

        if ( this.veValue === this.offValue ) {
            classList.push('n-off');
        }

        let events = {};

        if ( ! this.disabled ) {
            events.click = this.eventClick;
        }

        return (
            <div class={classList} on={events}>
                <span></span>
            </div>
        )
    },

    render($render)
    {
        this.$render = $render;

        let classList = [
            'n-switch__wrapper'
        ];

        if ( this.disabled ) {
            classList.push('n-disabled');
        }

        return (
            <div class={classList}>
                { this.ctor('renderSwitch')() }
            </div>
        );
    }

}
