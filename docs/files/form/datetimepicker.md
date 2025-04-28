# Datetimepicker

The `<n-datetimepicker>` component is a comprehensive input for selecting both date and time values. It combines date selection with time selection in a single dropdown panel.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    datetimepickerBinds: {
        size: 'md', 
        type: 'primary',
        clearable: false,
        disabled: false
    },
    datetimeValue: null
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="datetimepickerBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="datetimepickerBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Clearable">
                <n-switch v-model="datetimepickerBinds.clearable">Enable clear button</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="datetimepickerBinds.disabled">Disable datetimepicker</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Datetimepicker</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-datetimepicker v-model="datetimeValue" v-bind="datetimepickerBinds" placeholder="Select date and time"></n-datetimepicker>
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ $root.print(datetimeValue) }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Custom Format Datetimepicker</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-datetimepicker v-model="datetimeValue" v-bind="datetimepickerBinds" display-format="DD/MM/YYYY HH:mm:ss"></n-datetimepicker>
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ $root.print(datetimeValue) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Datetimepicker

| **Prop**            | **Type**       | **Default**           | **Description**                                                                   |
|---------------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `modelValue`        | `Any`          | `null`                 | The selected datetime value.                                                      |
| `clearValue`        | `Any`          | `null`                 | The value to set when clearing the datetime.                                      |
| `minDate`           | `Any`          | `null`                 | The minimum selectable date.                                                      |
| `maxDate`           | `Any`          | `null`                 | The maximum selectable date.                                                      |
| `size`              | `String`       | `'md'`                 | Sets the size of the datetimepicker component (e.g., 'sm', 'md', 'lg').          |
| `type`              | `String`       | `'primary'`            | Sets the style type of the datetimepicker component.                              |
| `placeholder`       | `String`       | `'Select datetime'`    | Placeholder text when no datetime is selected.                                    |
| `monthPanels`       | `Number`       | `1`                    | Number of month panels to display in the date picker (1-3).                       |
| `boundary`          | `Any`          | `null`                 | Boundary element for positioning the dropdown.                                    |
| `position`          | `String`       | `'bottom-start'`       | Position of the dropdown relative to the input.                                   |
| `disabled`          | `Boolean`      | `false`                | If true, disables the datetimepicker.                                             |
| `clearable`         | `Boolean`      | `false`                | If true, shows a button to clear the selected datetime.                           |
| `format`            | `String`       | `'YYYY-MM-DD HH:mm:ss'`| DateTime format for the model value.                                              |
| `displayFormat`     | `String`       | `'YYYY-MM-DD HH:mm:ss'`| DateTime format for display in the input field.                                   |
| `weekdays`          | `Array`        | `['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']` | Array of weekday abbreviations.                             |
| `months`            | `Array`        | `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']` | Array of month abbreviations. |

| **Method**               | **Description**                                                      |
|--------------------------|----------------------------------------------------------------------|
| `clearDatetimepicker()`  | Clears the selected datetime.                                        |

| **Event**               | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `update:modelValue`     | Emitted when the datetime value changes.                             |