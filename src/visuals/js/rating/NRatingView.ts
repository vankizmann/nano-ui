import { h } from "vue";
import { Arr, Locale, Num, Str } from "@kizmann/pico-js";
import { ProtoView } from "../../../root/index.ts";
import { NRatingController } from "./NRatingController.ts";

export class NRatingView extends ProtoView
{
    /**
     * @type {NRatingController}
     */
    declare scope : NRatingController;

    /**
     * @type {string}
     */
    bem : string = 'n-rating';

    default() : any
    {
        let { scope, data } = this.scope;

        let props : any = {
            class: data.classList,
        };

        return h('div', props, [
            this.stars(), this.value(),
        ]);
    }

    stars() : any
    {
        const { data } = this.scope;

        const stars = Arr.make(data.stars, (index : number) => {
            return this.star(index + 1);
        });

        return this.div('stars', stars);
    }

    star(index : number) : any
    {
        const { data } = this.scope;

        let classList = ['is-null'];

        if ( data.closest >= index - 0.5 ) {
            classList = ['is-half'];
        }

        if ( data.closest >= index ) {
            classList = ['is-full'];
        }

        const props : any = {
            class: classList
        };

        return h('span', props);
    }

    value() : any
    {
        const { data } = this.scope;

        let value = data.value;

        if ( data.closestValue ) {
            value = data.closest;
        }

        let props : any = {
            count: Str.number(value, data.decimals, 'en')
        };

        return this.div('value', [
            Locale.choice(data.starsText, value, props)
        ]);
    }

}

export default NRatingView;