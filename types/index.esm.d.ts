export function Install(App: any, Icons?: {}, Settings?: {}): void;
export namespace Icons {
    let handle: string;
    let checked: string;
    let circle: string;
    let intermediate: string;
    let clock: string;
    let calendar: string;
    let times: string;
    let primary: string;
    let secondary: string;
    let success: string;
    let warning: string;
    let danger: string;
    let info: string;
    let angleUp: string;
    let angleRight: string;
    let angleDown: string;
    let angleLeft: string;
    let angleDoubleLeft: string;
    let angleDoubleRight: string;
}
export namespace Settings {
    let iconPosition: string;
    let notifySize: string;
    let notifyPosition: string;
}
export namespace Nano {
    export { Icons };
    export { Settings };
    export { Install };
}
export default Nano;
