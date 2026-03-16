import { Arr, Mix, Obj } from "@kizmann/pico-js";
import NDragHelper from "./NDragHelper";

export class NVirtualHelper
{

    static visibles(scope : any) : any[]
    {
        let visibles = Arr.clone(scope.data.virtuals);

        visibles = Arr.filter(visibles, (node : any) => {
            return Arr.contains(scope.data.expanded, node.cascade.slice(0, -1));
        });

        return visibles;
    }

    static virtuals(scope : any, items : any = null, ...args : any[]) : any[]
    {
        if ( items == null ) {
            items = Arr.clone(scope.data.items);
        }

        items = Arr.reduce(items, (merge : any, item : any, index : any) => {
            return this.extract(scope, merge, item, index, ...args);
        }, []);

        Arr.each(items, (item : any, index: number) => {
            item.total = index;
        });

        return items;
    }

    static extract(scope : any, merge : any, item : any, index : any, depth : number = 0, path : string[] = ['items'], prev : any[] = []) : any
    {
        const { uniqueProp, childProp } = scope.data;

        const uid = Obj.get(item, ...[
            uniqueProp,
        ]);

        const parent = Arr.last(prev);

        const cascade = [
            ...prev, uid
        ];

        const route = [
            ...path, index
        ];

        let virtual : any = {
            uid, index, depth, route, cascade, parent,
        };

        let childs = Obj.get(item, ...[
            childProp, []
        ]);

        // Add child length
        virtual.childs = childs.length;

        if ( Mix.isEmpty(childs) ) {
            return [...merge, virtual];
        }

        const croute = [
            ...path, Mix.int(index), childProp
        ];

        const props = [
            depth + 1, croute, cascade
        ];

        childs = this.virtuals(...[
            scope, childs, ...props
        ]);

        return Arr.merge(...[
            merge, [virtual], childs
        ]);
    }

}

export default NVirtualHelper;