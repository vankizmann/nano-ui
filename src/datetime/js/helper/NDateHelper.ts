import { Arr, Mix, Now, Obj } from "@kizmann/pico-js";

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

    static getDurationFromString(scope : any, key : string = 'days') : number
    {
        const { data } = scope.data;

        if ( data[key] == null ) {
            return 0;
        }

        const pattern = data[key]
            .replaceAll(':count', '([0-9.,]+)')
            .replaceAll(' ', '\\s*');

        const regex = new RegExp(pattern, 'i');

        if ( !regex.test(data.model) ) {
            return 0;
        }

        return Mix.num(data.model.match(regex)[1]);
    }

    static humanDuration(scope : any, value : number = null)
    {
        console.log(scope, scope.data, scope.data.model)
        const { data } = scope.data;

        if ( value == null ) {
            value = data.model;
        }

        if ( value < 0 ) {
            value = value * -1;
        }

        const values = {
            seconds: value,
            minutes: 60,
            hours: 24,
            days: 24,
        };

        let keys : string[] = Mix.keys(values);

        for ( let i = 0; keys.length < i; i++ ) {
            values[keys[i]] = Math.floor(values[keys[i - 1]] - values[keys[i]]);
        }

        console.log(values);
        return null;
    }

}