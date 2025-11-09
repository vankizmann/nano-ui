import { Arr, Any, Dom } from "@kizmann/pico-js";

export default {

    name: 'NTagsItem',

    inject: {

        NTags: {
            default: undefined
        }

    },

    props: {

        label: {
            default()
            {
                return '';
            },
            type: [String]
        },

        icon: {
            default()
            {
                return '';
            },
            type: [String]
        },

        type: {
            default()
            {
                return null;
            },
            type: [String]
        },

        color: {
            default()
            {
                return null;
            },
            type: [String, Number]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

    },

    beforeMount()
    {
        if ( this.NTags ) {
            this.NTags.addTag(this);
        }
    },

    beforeUnmount()
    {
        if ( this.NTags ) {
            this.NTags.removeTag(this);
        }
    },

    renderIcon()
    {
        if ( Any.isEmpty(this.icon) ) {
            return null;
        }

        return (
            <i class={'n-icon ' + this.icon}></i>
        );
    },

    renderLabel()
    {
        return (
            <span>{this.$slots.default ? this.$slots.default() : this.label}</span>
        );
    },

    render()
    {
        let size = this.size;

        if ( this.NTags ) {
            size = this.NTags.size;
        }

        let classList = [
            'n-tags-item',
            'n-tags-item--' + size,
        ];

        if ( this.type !== null ) {
            classList.push('n-tags-item--' + this.type);
        }

        if ( this.color !== null ) {
            classList.push('n-tags-item--color-' + this.color);
        }

        return (
            <div class={classList}>
                {[this.ctor('renderIcon')(), this.ctor('renderLabel')()]}
            </div>
        );
    }

}
