# Input Number

The `<n-input-number>` component is a specialized input for entering numeric values. It provides increment and decrement buttons, supports min/max boundaries, and offers formatting options for numeric display.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    inputNumberBinds: {
        size: 'md', 
        type: 'primary',
        disabled: false,
        clearable: true,
        min: 0,
        max: 100,
        stepSize: 1,
        precision: 0,
        format: ':count'
    },
    numberValue: 42
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="inputNumberBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="inputNumberBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="inputNumberBinds.disabled">Disable input</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Clearable">
                <n-switch v-model="inputNumberBinds.clearable">Enable clear button</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Step Size">
                <n-input-number v-model="inputNumberBinds.stepSize" :min="0.1" :max="10" :step-size="0.1" :precision="1" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Precision">
                <n-input-number v-model="inputNumberBinds.precision" :min="0" :max="4" :precision="0" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Input Number</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-input-number v-model="numberValue" v-bind="inputNumberBinds" placeholder="Enter a number"></n-input-number>
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ $root.print(numberValue) }}</code>
            </div>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Currency Format</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-input-number v-model="numberValue" v-bind="inputNumberBinds" format="$:count" precision="2"></n-input-number>
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ $root.print(numberValue) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Input Number

| **Prop**        | **Type**       | **Default**           | **Description**                                                                   |
|-----------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Number`       | `null`                 | The current numeric value.                                                        |
| `clearValue`    | `Any`          | `null`                 | The value to set when clearing the input.                                         |
| `min`           | `Number`       | `0`                    | The minimum allowed value.                                                        |
| `max`           | `Number`       | `Number.MAX_VALUE`     | The maximum allowed value.                                                        |
| `placeholder`   | `String`       | `''`                   | Placeholder text when the input is empty.                                         |
| `size`          | `String`       | `'md'`                 | Sets the size of the input (e.g., 'sm', 'md', 'lg').                              |
| `type`          | `String`       | `'primary'`            | Sets the style type of the input.                                                 |
| `disabled`      | `Boolean`      | `false`                | If true, disables the input.                                                      |
| `clearable`     | `Boolean`      | `false`                | If true, shows a button to clear the input value.                                 |
| `stepSize`      | `Number`       | `1`                    | The increment/decrement step value for the buttons.                               |
| `precision`     | `Number`       | `0`                    | Number of decimal places to display and maintain.                                 |
| `format`        | `String`       | `':count'`             | Format string for displaying the number, with `:count` as the value placeholder.  |
| `decimals`      | `String`       | `'.'`                  | Decimal separator character.                                                      |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `clear()`             | Clears the input value.                                              |
| `nextStep()`          | Increments the value by the step size.                               |
| `prevStep()`          | Decrements the value by the step size.                               |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when the input value changes.                                |