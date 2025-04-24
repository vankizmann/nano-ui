import CascaderPanel from './src/cascader-panel/cascader-panel';
import Cascader from './src/cascader/cascader';

export default function (App) {
    App.component(CascaderPanel.name, CascaderPanel);
    App.component(Cascader.name, Cascader);
}