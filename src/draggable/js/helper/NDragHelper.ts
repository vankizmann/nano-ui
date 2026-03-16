import { Arr, Obj, Run } from "@kizmann/pico-js";

export class NDragHelper {

    static unlinkNodes(scope: any, clone : any, result : any, config : any)
    {
        if ( !scope.data.removeNode ) {
            return clone;
        }

        Arr.each(config.items, ({ value }) => {
            Obj.set(clone, value.route, null);
        });

        return clone;
    }

    static removeNodes(scope: any, clone : any, result : any, config : any)
    {
        if ( !scope.data.removeNode ) {
            return clone;
        }

        const { childProp } = scope.data;

        const fn = (value : any, prop : string = 'items') => {
            return Arr.filter(value?.[prop]);
        };

        clone.items = Arr.recursive(fn(clone), childProp, (node : any) => {
            return Obj.set(node, childProp, fn(node, childProp));
        });

        return clone;
    }

    static appendNodes(scope: any, clone : any, result : any, config : any)
    {
        const args : [...any] = [
            scope, clone, result, config
        ];

        if ( !scope.data.insertNode ) {
            return clone;
        }

        if ( config.uid === scope.uid ) {
            // @ts-ignore
            this.unlinkNodes(...args);
        }

        Arr.each(config.items, ({ item }) => {
            Arr.append(clone.items, item);
        });

        if ( config.uid === scope.uid ) {
            // @ts-ignore
            clone = this.removeNodes(...args);
        }

        return clone;
    }

    static insideNodes(scope: any, clone : any, result : any, config : any)
    {
        const args : [...any] = [
            scope, clone, result, config
        ];
        const { data } = scope;

        if ( !data.insertNode ) {
            return clone;
        }

        let value = Arr.find(data.virtuals, {
            uid: result.uids.item
        });

        if ( value == null ) {
            return clone;
        }

        if ( config.uid === scope.uid ) {
            // @ts-ignore
            this.unlinkNodes(...args);
        }

        const path = [
            ...value.route, data.childProp
        ];

        const childs = Obj.get(clone, path, []);

        Arr.each(config.items, ({ item }) => {
            Arr.append(childs, item);
        });

        Obj.set(clone, path, childs);

        if ( config.uid === scope.uid ) {
            // @ts-ignore
            this.removeNodes(...args);
        }

        return clone;
    }

    static beforeNodes(scope: any, clone : any, result : any, config : any)
    {
        const args : [...any] = [
            scope, clone, result, config
        ];

        const { data } = scope;

        if ( !data.insertNode ) {
            return clone;
        }

        let value = Arr.find(data.virtuals, {
            uid: result.uids.item
        });

        if ( value == null ) {
            return clone;
        }

        if ( config.uid === scope.uid ) {
            // @ts-ignore
            this.unlinkNodes(...args);
        }

        const path = [
            ...Arr.slice(value.route, 0, -1)
        ];

        const childs = Obj.get(clone, path, []);

        Arr.each(config.items.reverse(), ({ item }) => {
            Arr.insert(childs, value.index, item);
        });

        if ( config.uid === scope.uid ) {
            // @ts-ignore
            this.removeNodes(...args);
        }

        return clone;
    }

    static afterNodes(scope: any, clone : any, result : any, config : any)
    {
        const args : [...any] = [
            scope, clone, result, config
        ];

        const { data } = scope;

        if ( !data.insertNode ) {
            return clone;
        }

        let value = Arr.find(data.virtuals, {
            uid: result.uids.item
        });

        if ( value == null ) {
            return clone;
        }

        if ( config.uid === scope.uid ) {
            // @ts-ignore
            this.unlinkNodes(...args);
        }

        const path = [
            ...Arr.slice(value.route, 0, -1)
        ];

        const childs = Obj.get(clone, path, []);

        Arr.each(config.items.reverse(), ({ item }) => {
            Arr.insert(childs, value.index + 1, item);
        });

        if ( config.uid === scope.uid ) {
            // @ts-ignore
            this.removeNodes(...args);
        }

        return clone;
    }

}

export default NDragHelper;