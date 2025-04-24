import Notifcation from './src/notification/notification';

export default function (App) {
    App.config.globalProperties[Notifcation.alias] = window[Notifcation.alias] = Notifcation.handle;
}
