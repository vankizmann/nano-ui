# Timepicker

The `<n-timepicker>` component is a customizable time picker that allows users to select time values. It features hour, minute, and second selection with configurable intervals.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    timepickerBinds: {
        size: 'md', 
        type: 'primary',
        clearable: false,
        disabled: false,
        hoursInterval: 1,
        minutesInterval: 5,
        secondsInterval: 10
    },
    timeValue: null
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="timepickerBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="timepickerBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Clearable">
                <n-switch v-model="timepickerBinds.clearable">Enable clear button</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="timepickerBinds.disabled">Disable timepicker</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Timepicker</h3>
            </div>
            <div class="col--auto">
                <n-timepicker v-model="timeValue" v-bind="timepickerBinds"></n-timepicker>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(timeValue) }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Without seconds</h3>
            </div>
            <div class="col--auto">
                <n-timepicker v-model="timeValue" v-bind="timepickerBinds" display-format="HH:mm"></n-timepicker>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(timeValue) }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Custom Intervals</h3>
            </div>
            <div class="col--auto">
                <n-timepicker v-model="timeValue" v-bind="timepickerBinds" hours-interval="2" minutes-interval="15" seconds-interval="30"></n-timepicker>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(timeValue) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Timepicker

| **Prop**           | **Type**       | **Default**           | **Description**                                                                   |
|--------------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `modelValue`       | `Any`          | `null`                 | The selected time value.                                                          |
| `clearValue`       | `Any`          | `null`                 | The value to set when clearing the time.                                          |
| `placeholder`      | `String`       | `'Select time'`        | Placeholder text when no time is selected.                                        |
| `size`             | `String`       | `'md'`                 | Sets the size of the timepicker component (e.g., 'sm', 'md', 'lg').              |
| `type`             | `String`       | `'primary'`            | Sets the style type of the timepicker component.                                  |
| `position`         | `String`       | `'bottom-start'`       | Position of the dropdown relative to the input.                                   |
| `disabled`         | `Boolean`      | `false`                | If true, disables the timepicker.                                                 |
| `clearable`        | `Boolean`      | `false`                | If true, shows a button to clear the selected time.                               |
| `format`           | `String`       | `'YYYY-MM-DD HH:mm:ss'`| Time format for the model value.                                                  |
| `displayFormat`    | `String`       | `'HH:mm:ss'`           | Time format for display in the input field.                                       |
| `hoursInterval`    | `Number`       | `1`                    | Interval between hour options in the dropdown.                                    |
| `minutesInterval`  | `Number`       | `1`                    | Interval between minute options in the dropdown.                                  |
| `secondsInterval`  | `Number`       | `1`                    | Interval between second options in the dropdown.                                  |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `clearTimepicker()`   | Clears the selected time.                                            |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when the time is selected.                                   |

<hr>

## Timepicker Panel

| **Prop**           | **Type**       | **Default**           | **Description**                                                                   |
|--------------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `modelValue`       | `Any`          | `null`                 | The selected time value.                                                          |
| `clearValue`       | `Any`          | `null`                 | The value to set when clearing the time.                                          |
| `placeholder`      | `String`       | `'Select time'`        | Placeholder text when no time is selected.                                        |
| `size`             | `String`       | `'md'`                 | Sets the size of the panel.                                                       |
| `type`             | `String`       | `'primary'`            | Sets the style type of the panel.                                                 |
| `disabled`         | `Boolean`      | `false`                | If true, disables the timepicker panel.                                           |
| `format`           | `String`       | `'YYYY-MM-DD HH:mm:ss'`| Time format for the model value.                                                  |
| `displayFormat`    | `String`       | `'HH:mm:ss'`           | Time format for display.                                                          |
| `hoursInterval`    | `Number`       | `1`                    | Interval between hour options.                                                    |
| `minutesInterval`  | `Number`       | `1`                    | Interval between minute options.                                                  |
| `secondsInterval`  | `Number`       | `1`                    | Interval between second options.                                                  |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when a time value is selected.                               |