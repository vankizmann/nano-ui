export namespace Draglist {
    let items: PropType<any[]>;
    let current: PropType<object>;
    let selected: PropType<any[]>;
    let expanded: PropType<any[]>;
    let group: PropType<any[]>;
    let allowGroups: PropType<any[]>;
    let safezone: PropType<number | Function>;
    let renderHandle: PropType<boolean>;
    let renderExpand: PropType<boolean>;
    let renderSelect: PropType<boolean>;
    let allowSelect: PropType<boolean | Function>;
    let allowDrag: PropType<boolean | Function>;
    let allowDrop: PropType<boolean | Function>;
    let transformDrop: PropType<Function>;
    let insertNode: PropType<boolean>;
    let removeNode: PropType<boolean>;
    let uniqueProp: PropType<string>;
    let childProp: PropType<string>;
    let itemHeight: PropType<number>;
    let itemOffset: PropType<number>;
    let itemSkip: PropType<boolean>;
    let rootSkip: PropType<boolean>;
}
import { PropType } from "vue";
