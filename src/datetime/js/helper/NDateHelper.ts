import { Arr, Mix, Now } from "@kizmann/pico-js";

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

        if ( ! Mix.isArr(model) ) {
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

}