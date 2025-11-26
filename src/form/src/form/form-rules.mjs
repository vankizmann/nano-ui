import { Any, Locale } from "@kizmann/pico-js";

export const FormMessage = {

    required: (field, value) => {
        return Locale.trans('Field is required');
    },

    value: (field, value, val = 'foobar') => {
        return Locale.trans('Must be exact value :val', { val });
    },

    min: (field, value, min = Number.MIN_VALUE) => {
        return Locale.trans('Must be greather than :min', { min });
    },

    max: (field, value, max = Number.MAX_VALUE) => {
        return Locale.trans('Must be lesser than :max', { max });
    },

    minlength: (field, value, min = Number.MIN_VALUE) => {
        return Locale.trans('Length must be greater than :min', { min });
    },

    maxlength: (field, value, max = Number.MAX_VALUE) => {
        return Locale.trans('Length must be lesser than :max', { max });
    },

    email: (field, value) => {
        return Locale.trans('Must be a valid email');
    }

};

export const FormRules = {

    required: (field, value) => {

        if ( Any.isBool(value) ) {
            return value === true;
        }

        return ! Any.isEmpty(value);
    },

    value: (field, value, val = 'foobar') => {

        if ( Any.isString(value) ) {
            return value === val;
        }

        return false;
    },

    min: (field, value, min = Number.MIN_VALUE) => {

        if ( Any.isNumber(value) ) {
            return value >= min;
        }

        return false;
    },

    max: (field, value, max = Number.MAX_VALUE) => {

        if ( Any.isNumber(value) ) {
            return value <= max;
        }

        return false;
    },

    minlength: (field, value, min = Number.MIN_VALUE) => {

        if ( Any.isString(value) || Any.isArray(value) ) {
            return value.length > min;
        }

        return false;
    },

    maxlength: (field, value, max = Number.MAX_VALUE) => {

        if ( Any.isString(value) || Any.isArray(value) ) {
            return value.length < max;
        }

        return false;
    },

    email: (field, value) => {

        if ( Any.isString(value) ) {
            return value.match(/^.*?@.*?\.[a-z]{2,}$/);
        }

        return false;
    }

};