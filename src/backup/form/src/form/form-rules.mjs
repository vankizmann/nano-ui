import { Mix, Arr, Locale, Obj } from "@kizmann/pico-js";

export const FormMessage = {

    required(field, value)
    {
        return Locale.trans('Field is required');
    },

    required_if(field, value, key = '')
    {

        let label = Arr.find(this.elements, (item) => {
            return item.prop === key;
        }) || key;

        return Locale.trans('Field is required if :label isset', {
            label: label.label || key
        });
    },

    required_unless(field, value, key = '')
    {
        let label = Arr.find(this.elements, (item) => {
            return item.prop === key;
        });

        return Locale.trans('Field is required unless :label isset', {
            label: label.label || key
        });
    },

    same(field, value, key = '')
    {
        let label = Arr.find(this.elements, (item) => {
            return item.prop === key;
        }) || key;

        return Locale.trans('Must be same as :label', {
            label: label.label || key
        });
    },

    diffrent(field, value, key = '')
    {
        let label = Arr.find(this.elements, (item) => {
            return item.prop === key;
        }) || key;

        return Locale.trans('Must be diffrent from :label', {
            label: label.label || key
        });
    },

    value(field, value, val = 'foobar')
    {
        return Locale.trans('Must be exact value :val', { val });
    },

    min(field, value, min = Number.MIN_VALUE)
    {
        return Locale.trans('Must be greather than :min', { min });
    },

    max(field, value, max = Number.MAX_VALUE)
    {
        return Locale.trans('Must be lesser than :max', { max });
    },

    minlength(field, value, min = Number.MIN_VALUE)
    {
        return Locale.trans('Length must be greater than :min', { min });
    },

    maxlength(field, value, max = Number.MAX_VALUE)
    {
        return Locale.trans('Length must be lesser than :max', { max });
    },

    email(field, value)
    {
        return Locale.trans('Must be a valid email');
    }

};

export const FormRules = {

    required(field, value)
    {
        if ( Mix.isBool(value) ) {
            return value === true;
        }

        return !Mix.isEmpty(value);
    },

    required_if(field, value, key = '')
    {
        let target = Obj.get(this.form, key);

        if ( Mix.isEmpty(target) ) {
            return true;
        }

        if ( Mix.isBool(value) ) {
            return value === true;
        }

        return !Mix.isEmpty(value);
    },

    required_unless(field, value, key = '')
    {
        let target = Obj.get(this.form, key);

        if ( !Mix.isEmpty(target) ) {
            return true;
        }

        if ( Mix.isBool(value) ) {
            return value === true;
        }

        return !Mix.isEmpty(value);
    },

    same(field, value, key = '')
    {
        return value === Obj.get(this.form, key);
    },

    diffrent(field, value, key = '')
    {
        return value !== Obj.get(this.form, key);
    },

    value(field, value, val = 'foobar')
    {
        if ( Mix.isString(value) ) {
            return value === val;
        }

        return false;
    },

    min(field, value, min = Number.MIN_VALUE)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isNumber(value) ) {
            return value >= min;
        }

        return false;
    },

    max(field, value, max = Number.MAX_VALUE)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isNumber(value) ) {
            return value <= max;
        }

        return false;
    },

    minlength(field, value, min = Number.MIN_VALUE)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isString(value) || Mix.isArray(value) ) {
            return value.length > min;
        }

        return false;
    },

    maxlength(field, value, max = Number.MAX_VALUE)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isString(value) || Mix.isArray(value) ) {
            return value.length < max;
        }

        return false;
    },

    email(field, value)
    {
        if ( Mix.isEmpty(value) ) {
            return true;
        }

        if ( Mix.isString(value) ) {
            return value.match(/^.*?@.*?\.[a-z]{2,}$/);
        }

        return false;
    }

};