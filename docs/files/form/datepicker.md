# Datepicker

The `<n-datepicker>` component is a customizable date picker that allows users to select dates or date ranges. It includes various display options, formatting capabilities, and navigation features.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    datepickerBinds: {
        size: 'md', 
        type: 'primary',
        clearable: false,
        disabled: false
    },
    dateValues: {
        single: null,
        arrive: null,
        depart: null
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="datepickerBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="datepickerBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Clearable">
                <n-switch v-model="datepickerBinds.clearable">Enable clear button</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="datepickerBinds.disabled">Disable datepicker</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Single Datepicker</h3>
            </div>
            <div class="col--auto">
                <n-datepicker v-model="dateValues.single" v-bind="datepickerBinds"></n-datepicker>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(dateValues.single) }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Range Datepicker</h3>
            </div>
            <div class="col--auto">
                <n-datepicker v-bind="datepickerBinds" range v-model:arrive="dateValues.arrive" v-model:depart="dateValues.depart" :month-panels="2"></n-datepicker>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print([dateValues.arrive, dateValues.depart]) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Datepicker

| **Prop**            | **Type**       | **Default**           | **Description**                                                                   |
|---------------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `modelValue`        | `Any`          | `null`                 | The selected date (for single date mode).                                         |
| `clearValue`        | `Any`          | `null`                 | The value to set when clearing the single date.                                   |
| `arrive`            | `Any`          | `null`                 | The start date (for range mode).                                                  |
| `clearArrive`       | `Any`          | `null`                 | The value to set when clearing the start date.                                    |
| `depart`            | `Any`          | `null`                 | The end date (for range mode).                                                    |
| `clearDepart`       | `Any`          | `null`                 | The value to set when clearing the end date.                                      |
| `minDate`           | `Any`          | `null`                 | The minimum selectable date.                                                      |
| `maxDate`           | `Any`          | `null`                 | The maximum selectable date.                                                      |
| `size`              | `String`       | `'md'`                 | Sets the size of the datepicker component (e.g., 'sm', 'md', 'lg').              |
| `type`              | `String`       | `'primary'`            | Sets the style type of the datepicker component.                                  |
| `placeholder`       | `String`       | `'Select date'`        | Placeholder text for single date mode.                                            |
| `placeholderArrive` | `String`       | `'Start date'`         | Placeholder text for the start date input in range mode.                          |
| `placeholderDepart` | `String`       | `'End date'`           | Placeholder text for the end date input in range mode.                            |
| `range`             | `Boolean`      | `false`                | If true, enables date range selection mode.                                       |
| `rangeSeparator`    | `String`       | `'-'`                  | Separator character between start and end dates in range mode.                    |
| `monthPanels`       | `Number`       | `1`                    | Number of month panels to display in the picker (1-3).                            |
| `boundary`          | `Any`          | `null`                 | Boundary element for positioning the dropdown.                                    |
| `position`          | `String`       | `'bottom-start'`       | Position of the dropdown relative to the input.                                   |
| `disabled`          | `Boolean`      | `false`                | If true, disables the datepicker.                                                 |
| `clearable`         | `Boolean`      | `false`                | If true, shows a button to clear the selected date(s).                            |
| `format`            | `String`       | `'YYYY-MM-DD HH:mm:ss'`| Date format for the model value.                                                  |
| `displayFormat`     | `String`       | `'YYYY-MM-DD'`         | Date format for display in the input field.                                       |
| `weekdays`          | `Array`        | `['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']` | Array of weekday abbreviations.                             |
| `months`            | `Array`        | `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']` | Array of month abbreviations. |

| **Method**              | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `clearDatepicker()`     | Clears the selected date(s).                                         |


| **Event**               | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `update:modelValue`     | Emitted when the date is selected in single mode.                    |
| `update:arrive`         | Emitted when the start date is selected in range mode.               |
| `update:depart`         | Emitted when the end date is selected in range mode.                 |
| `rangeSelected`         | Emitted when a complete date range is selected.                      |

<hr>

## Datepicker Panel

| **Prop**            | **Type**       | **Default**           | **Description**                                                                   |
|---------------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `modelValue`        | `Any`          | `null`                 | The selected date (for single date mode).                                         |
| `arrive`            | `Any`          | `null`                 | The start date (for range mode).                                                  |
| `depart`            | `Any`          | `null`                 | The end date (for range mode).                                                    |
| `minDate`           | `Any`          | `null`                 | The minimum selectable date.                                                      |
| `maxDate`           | `Any`          | `null`                 | The maximum selectable date.                                                      |
| `size`              | `String`       | `'md'`                 | Sets the size of the panel.                                                       |
| `type`              | `String`       | `'primary'`            | Sets the style type of the panel.                                                 |
| `range`             | `Boolean`      | `false`                | If true, enables date range selection mode.                                       |
| `monthPanels`       | `Number`       | `1`                    | Number of month panels to display (1-3).                                          |
| `disabled`          | `Boolean`      | `false`                | If true, disables the datepicker panel.                                           |
| `format`            | `String`       | `'YYYY-MM-DD HH:mm:ss'`| Date format for the model value.                                                  |
| `weekdays`          | `Array`        | `['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']` | Array of weekday abbreviations.                             |
| `months`            | `Array`        | `['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']` | Array of month abbreviations. |


| **Event**               | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `update:modelValue`     | Emitted when the date is selected in single mode.                    |
| `update:arrive`         | Emitted when the start date is selected in range mode.               |
| `update:depart`         | Emitted when the end date is selected in range mode.                 |
| `rangeSelected`         | Emitted when a complete date range is selected.                      |