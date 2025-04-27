# Slider

The `<n-slider>` component is a customizable slider control that allows users to select numerical values by dragging handles along a track. It supports both single value and range selection.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    sliderBinds: {
        size: 'md', 
        type: 'primary',
        disabled: false,
        min: 0,
        max: 100
    },
    sliderValue: 50,
    sliderRangeValue: [20, 80],
    sliderLabelsValue: 2,
    sliderLabels: ['Low', 'Medium', 'High']
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="sliderBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="sliderBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="sliderBinds.disabled">Disable slider</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Slider</h3>
            </div>
            <div class="col--1-1">
                <n-slider v-model="sliderValue" v-bind="sliderBinds"></n-slider>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(sliderValue) }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>10 Steps Slider</h3>
            </div>
            <div class="col--1-1">
                <n-slider v-model="sliderValue" v-bind="sliderBinds" :steps="10"></n-slider>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(sliderValue) }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Range Slider</h3>
            </div>
            <div class="col--1-1">
                <n-slider  v-model="sliderRangeValue"  v-bind="sliderBinds" range></n-slider>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(sliderRangeValue) }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Slider with Custom Steps and Labels</h3>
            </div>
            <div class="col--1-1">
                <n-slider v-model="sliderLabelsValue" v-bind="sliderBinds" :steps="[0, 1, 2]" :labels="sliderLabels"></n-slider>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(sliderLabelsValue) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Slider

| **Prop**      | **Type**          | **Default** | **Description**                                                                   |
|---------------|-------------------|-------------|-----------------------------------------------------------------------------------|
| `modelValue`  | `Number/Array`    | `null`      | The current value(s) of the slider. For range sliders, should be an array [min, max]. |
| `range`       | `Boolean`         | `false`     | If true, enables range selection mode with two handles.                           |
| `steps`       | `Number/Array`    | `1`         | Step size between values, or an array of specific allowed values.                 |
| `labels`      | `Array`           | `[]`        | Array of labels to display for each step when using an array of steps.            |
| `min`         | `Number`          | `0`         | Minimum value of the slider (used when steps is a number).                        |
| `max`         | `Number`          | `100`       | Maximum value of the slider (used when steps is a number).                        |
| `type`        | `String`          | `'primary'` | Sets the style type of the slider.                                                |
| `size`        | `String`          | `'md'`      | Sets the size of the slider (e.g., 'sm', 'md', 'lg').                             |
| `disabled`    | `Boolean`         | `false`     | If true, disables the slider.                                                     |

| **Event**           | **Description**                                                      |
|---------------------|----------------------------------------------------------------------|
| `update:modelValue` | Emitted when the slider value(s) change.                             |