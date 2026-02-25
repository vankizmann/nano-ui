/**
 * @class ProtoData
 *
 * @typedef {import('./ProtoController.js')} ProtoController
 * @typedef {import('../props/BaseData.js')} BaseData
 * @typedef {import('../props/AlignData.js')} AlignData
 * @typedef {import('../props/IconData.js')} IconData
 * @typedef {import('../props/OptionData.js')} OptionData
 * @typedef {import('../props/PositionData.js')} PositionData
 * @typedef {import('../props/DragData.js')} DragData
 *
 * @extends BaseData
 * @extends AlignData
 * @extends IconData
 * @extends OptionData
 * @extends PositionData
 * @extends DragData
 *
 * @template {ProtoController} NCX
 */
export class ProtoData {
    constructor(scope: any);
    /**
     * @type {NCX}
     */
    scope: NCX;
    classRoot(merge?: any[]): any[];
    classPart(part: any, merge?: any[]): string[];
}
export function ProtoDataBuilder(): typeof ProtoData;
export type ProtoController<NCX extends ProtoController> = typeof import("./ProtoController.js");
export type BaseData<NCX extends ProtoController> = typeof import("../props/BaseData.js");
export type AlignData<NCX extends ProtoController> = typeof import("../props/AlignData.js");
export type IconData<NCX extends ProtoController> = typeof import("../props/IconData.js");
export type OptionData<NCX extends ProtoController> = typeof import("../props/OptionData.js");
export type PositionData<NCX extends ProtoController> = typeof import("../props/PositionData.js");
export type DragData<NCX extends ProtoController> = typeof import("../props/DragData.js");
