import * as BaseProps from "./js/props/BaseProps.js";
import * as IconProps from "./js/props/IconProps.js";
import * as AlignProps from "./js/props/AlignProps.js";
import * as TextProps from "./js/props/TextProps.js";
import * as OptionProps from "./js/props/OptionProps.js";
import * as PositionProps from "./js/props/PositionProps.js";
import * as DragProps from "./js/props/DragProps.js";

export const Props = {
    ...BaseProps,
    ...IconProps,
    ...AlignProps,
    ...TextProps,
    ...OptionProps,
    ...PositionProps,
    ...DragProps,
};

/**
 * @template TARGET, BASES
 * @param {BASES[]} args - Array of source objects
 * @param {TARGET} target - The target object
 * @returns {TARGET & BASES} - The intersection of Target and Source
 */
export const PropMerge = (args, target) => {
    return Object.assign({}, target, ...args);
};

import ProtoController from "./js/proto/ProtoController.js";
import GroupController from "./js/group/GroupController.js";
import { ProtoDataBuilder } from "./js/proto/ProtoData.js";
import ProtoView from "./js/proto/ProtoView.jsx";

const ProtoData = ProtoDataBuilder();

console.log('ProtoData', new ProtoData(null));

export {
    ProtoController,
    GroupController,
    ProtoData,
    ProtoView,
};

import { Pointer } from "./js/pointer/Pointer.js";

export {
    Pointer
}

if ( ! globalThis.Pointer ) {
    globalThis.NPointer = Pointer.init();
}