// types/index.d.ts

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

declare interface SettingsInterface {
    iconPosition: string;
    notifySize: string;
    notifyPosition: string;
    [key: string]: string;
}

export declare module "@kizmann/nano-ui" {

    function Install(App: any, Icons?: Partial<IconsInterface>, Settings?: Partial<SettingsInterface>): void;

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

export declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        ctor: (key: string, fallback?: any) => () => any
        cmer: (classList: any) => () => any
        cslo: (slot: string, props?: object) => () => any

        trans: (key: string, values?: object) => string;
        choice: (key: string, count?: number, values?: object) => () => any
    }
}
