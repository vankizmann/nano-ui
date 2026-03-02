import ProtoExtend from "./js/proto/ProtoExtend.ts";
import ProtoController from "./js/proto/ProtoController.ts";
import ProtoData from "./js/proto/ProtoData.ts";
import ProtoView from "./js/proto/ProtoView.ts";
import GroupController from "./js/controller/GroupController.ts";
import BaseData from "./js/data/BaseData.ts";
import IconData from "./js/data/IconData.ts";
import AlignData from "./js/data/AlignData.ts";
import PositionData from "./js/data/PositionData.ts";
import TextData from "./js/data/TextData.ts";
import OptionData from "./js/data/OptionData.ts";
import DragData from "./js/data/DragData.ts";

export {
    ProtoExtend,
    ProtoController,
    ProtoData,
    ProtoView,
    GroupController,
    BaseData,
    IconData,
    AlignData,
    PositionData,
    TextData,
    OptionData,
    DragData,
};

import * as BaseProps from "./js/prop/BaseProps.ts";
import * as IconProps from "./js/prop/IconProps.ts";
import * as AlignProps from "./js/prop/AlignProps.ts";
import * as PositionProps from "./js/prop/PositionProps.ts";
import * as TextProps from "./js/prop/TextProps.ts";
import * as OptionProps from "./js/prop/OptionProps.ts";
import * as DragProps from "./js/prop/DragProps.ts";

export const Props = {
    ...BaseProps,
    ...IconProps,
    ...AlignProps,
    ...PositionProps,
    ...TextProps,
    ...OptionProps,
    ...DragProps,
};

import { OptionHelper } from "./js/helper/OptionHelper.ts";

export const Helpers = {
    Option: OptionHelper,
};

import Pointer from "./js/module/Pointer.ts";
import Styler from "./js/module/Styler.ts";

export {
    Pointer, Styler
};
