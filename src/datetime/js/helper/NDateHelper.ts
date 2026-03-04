import { Arr, Locale, Mix, Now, Obj } from "@kizmann/pico-js";

export class NDateHelper
{

    static getDate(scope : any, date : any = null)
    {
        const { model, arrive, depart } = scope.data;

        if ( !Mix.isEmpty(depart) ) {
            date = depart;
        }

        if ( !Mix.isEmpty(arrive) ) {
            date = arrive;
        }

        if ( !Mix.isEmpty(model) ) {
            date = Arr.all(model);
        }

        return Now.make(...[Arr.first(date)]);
    }

    static getDates(scope : any, date : any = [null, null])
    {
        const { model, arrive, depart } = scope.data;

        if ( !Mix.isEmpty(depart) ) {
            date[1] = depart;
        }

        if ( !Mix.isEmpty(arrive) ) {
            date[0] = arrive;
        }

        if ( !Mix.isArr(model) ) {
            date = [model, model];
        }

        if ( Mix.isArr(model) ) {
            date = Arr.slice(model, 0, 2);
        }

        return Arr.each(date, (d : any) => {
            return Now.make(d);
        });
    }

    static getDisplays(scope : any, date : any = null)
    {
        if ( date == null ) {
            date = this.getDate(scope, date);
        }

        if ( !date.input ) {
            date.reset({ time: true });
        }

        const dates = Arr.make(scope.data.panels, (i : number) => {
            return date.clone().add(i, 'months');
        });

        return dates ?? [];
    }

    static getDurationData(scope : any, value : number = null)
    {
        const { model } = scope.data;

        if ( value == null ) {
            value = model;
        }

        if ( value < 0 ) {
            value = value * -1;
        }

        if ( value == 0 || value == null ) {
            return null;
        }

        return Now.make().safeDuration(value);
    }

    static getDurationString(scope : any, value : number = null) : string
    {
        const result = this.getDurationData(scope, value);

        if ( !result ) {
            return null;
        }

        let texts = [];

        Arr.each(result, (v : number, k : string) => {
            if ( v !== 0 ) texts.push(Locale.choice(scope.get(k), v));
        });

       return texts.join(' ');
    }

    static getDurationMatch(scope : any, value: string, key : string = 'days') : number
    {
        const pattern = scope.get(key, '')
            .replace(/\s+/g, '\\s*')
            .replace(/:count/g, '([0-9]+)');

        const regex = new RegExp(pattern, 'i');

        if ( !regex.test(value) ) {
            return 0;
        }

        return Mix.num(value.match(regex)[1]);
    }

    static getDurationNumber(scope : any, value : string = null) : number
    {
        if ( value == null ) {
            return 0;
        }

        let keys = [
            'dates', 'hours', 'minutes', 'seconds'
        ];

        const date = Now.make(), backup = date.clone();

        Arr.each(keys, (k : string) => {
            date.add(this.getDurationMatch(scope, value, k), k);
        });

        return date.diffrence(backup);
    }

}