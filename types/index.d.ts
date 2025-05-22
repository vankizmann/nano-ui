// types/index.d.ts
// import Cookie from "./library/cookie";

declare interface IconsInterface {
    handle: string;
    checked: string;
    circle: string;
    intermediate: string;
    clock: string;
    calendar: string;
    times: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    angleUp: string;
    angleRight: string;
    angleDown: string;
    angleLeft: string;
    angleDoubleLeft: string;
    angleDoubleRight: string;
    [key: string]: string;
}

export declare module "@kizmann/nano-ui" {

    function Install(App: any, Icons?: Partial<IconsInterface>): void;

    const Icons: typeof IconsInterface;
    const Settings: typeof SettingsInterface;

    export {
        Icons,
        Settings,
        Install
    };

    export default {
        Icons,
        Settings,
        Install
    };
}