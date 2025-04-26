# Durationpicker

The `<n-durationpicker>` component is a specialized input for selecting time duration values. It provides a dropdown with common duration options and supports manual entry with human-readable formats.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    durationBinds: {
        size: 'md', 
        type: 'primary',
        disabled: false,
        clearable: false
    },
    durationValue: 3600,
    customOptions: [
        60,      // 1 minute
        300,     // 5 minutes
        900,     // 15 minutes
        1800,    // 30 minutes
        3600,    // 1 hour
        7200,    // 2 hours
        86400    // 1 day
    ]
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="durationBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="durationBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="durationBinds.disabled">Disable durationpicker</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Clearable">
                <n-switch v-model="durationBinds.clearable">Enable clear button</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Standard Duration Options</h3>
            </div>
            <div class="col--auto">
                <n-durationpicker v-model="durationValue" v-bind="durationBinds"></n-durationpicker>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(durationValue) }}</code>
            </div>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Custom Duration Options</h3>
            </div>
            <div class="col--auto">
                <n-durationpicker 
                    v-model="durationValue" 
                    v-bind="durationBinds"
                    :options="customOptions"
                ></n-durationpicker>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(durationValue) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Durationpicker

| **Prop**        | **Type**       | **Default**           | **Description**                                                                   |
|-----------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Number`       | `null`                 | The current duration value in seconds.                                            |
| `clearValue`    | `Any`          | `null`                 | The value to set when clearing the duration.                                      |
| `options`       | `Array`        | `[...]`                | Array of duration options in seconds to display in the dropdown.                  |
| `minDuration`   | `Number`       | `null`                 | Minimum allowed duration in seconds.                                              |
| `maxDuration`   | `Number`       | `null`                 | Maximum allowed duration in seconds.                                              |
| `size`          | `String`       | `'md'`                 | Sets the size of the durationpicker (e.g., 'sm', 'md', 'lg').                    |
| `type`          | `String`       | `'primary'`            | Sets the style type of the durationpicker.                                        |
| `placeholder`   | `String`       | `'Select duration'`    | Placeholder text when no duration is selected.                                    |
| `negativeText`  | `String`       | `'Negative duration'`  | Text to display for negative duration values.                                     |
| `boundary`      | `Any`          | `null`                 | Boundary element for positioning the dropdown.                                    |
| `position`      | `String`       | `'bottom-start'`       | Position of the dropdown relative to the input.                                   |
| `disabled`      | `Boolean`      | `false`                | If true, disables the durationpicker.                                             |
| `clearable`     | `Boolean`      | `false`                | If true, shows a button to clear the selected duration.                           |
| `days`          | `String`       | `':count Day\|:count Days'` | Format string for displaying day values.                                     |
| `hours`         | `String`       | `':count Hour\|:count Hours'` | Format string for displaying hour values.                                  |
| `minutes`       | `String`       | `':count Minute\|:count Minutes'` | Format string for displaying minute values.                            |
| `seconds`       | `String`       | `':count Second\|:count Seconds'` | Format string for displaying second values.                            |

| **Method**               | **Description**                                                      |
|--------------------------|----------------------------------------------------------------------|
| `clearDurationpicker()`  | Clears the selected duration.                                        |
| `humanizeValue(value)`   | Converts a duration in seconds to a human-readable string.           |
| `digitizeValue(text)`    | Converts a human-readable duration string to seconds.                |

| **Event**              | **Description**                                                      |
|------------------------|----------------------------------------------------------------------|
| `update:modelValue`    | Emitted when the duration value changes.                             |