import Vue from "vue";

import Slider from './src/slider/slider';

export default function (App) {
    App.component(Slider.name, Slider);
}