# Checkbox

The `<n-checkbox>` component is a customizable checkbox component with various options to control its appearance and behavior. It can be used individually or as part of a `<n-checkbox-group>` for selecting multiple values.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    checkboxBinds: {
        size: 'md', 
        disabled: false, 
        type: 'primary', 
        intermediate: false,
        allowUncheck: false
    },
    checkboxValues: {
        single: false,
        group: ['option1']
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="checkboxBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="checkboxBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="checkboxBinds.disabled">Activate disable state</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="AllowUncheck">
                <n-switch v-model="checkboxBinds.allowUncheck">Enable allowUncheck</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Single Checkbox</h3>
            </div>
            <div class="col--auto">
                <n-checkbox v-model="checkboxValues.single" v-bind="checkboxBinds">Single checkbox option</n-checkbox>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ checkboxValues.single }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Checkbox Group</h3>
            </div>
            <div class="col--auto">
                <n-checkbox-group v-model="checkboxValues.group" :size="checkboxBinds.size">
                    <n-checkbox value="option1" v-bind="checkboxBinds">Option 1</n-checkbox>
                    <n-checkbox value="option2" v-bind="checkboxBinds">Option 2</n-checkbox>
                    <n-checkbox value="option3" v-bind="checkboxBinds">Option 3</n-checkbox>
                    <n-checkbox global v-bind="checkboxBinds">Select All</n-checkbox>
                </n-checkbox-group>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ checkboxValues.group }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Vertical Alignment</h3>
            </div>
            <div class="col--auto">
                <n-checkbox-group v-model="checkboxValues.group" :size="checkboxBinds.size" align="vertical">
                    <n-checkbox value="option1" v-bind="checkboxBinds">Option 1</n-checkbox>
                    <n-checkbox value="option2" v-bind="checkboxBinds">Option 2</n-checkbox>
                    <n-checkbox value="option3" v-bind="checkboxBinds">Option 3</n-checkbox>
                </n-checkbox-group>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Checkbox

| **Prop**        | **Type**  | **Default** | **Description**                                                                              |
|-----------------|-----------|-------------|----------------------------------------------------------------------------------------------|
| `modelValue`    | `Boolean` | `false`     | The current state of the checkbox.                                                           |
| `value`         | `Any`     | `null`      | The value of the checkbox when used within a checkbox group.                                 |
| `allowUncheck`  | `Boolean` | `false`     | If true, allows the checkbox to be unchecked even when disabled.                             |
| `disabled`      | `Boolean` | `false`     | If true, disables the checkbox.                                                              |
| `type`          | `String`  | `'primary'` | Sets the style type of the checkbox.                                                         |
| `size`          | `String`  | `'md'`      | Sets the size of the checkbox (e.g., 'sm', 'md', 'lg').                                      |
| `intermediate`  | `Boolean` | `false`     | If true, displays the checkbox in an intermediate state.                                     |
| `global`        | `Boolean` | `false`     | If true and within a checkbox group, the checkbox acts as a "select all" toggle.             |


| **Method**    | **Description**                                       |
|---------------|-------------------------------------------------------|
| `toggle()`    | Toggles the checkbox state.                           |
| `check()`     | Sets the checkbox to checked state.                   |
| `uncheck()`   | Sets the checkbox to unchecked state.                 |


| **Name**              | **Description**                             |
|-----------------------|---------------------------------------------|
| `$slots.default`      | Content for the checkbox label.             |
| `$slots.label`        | Alternative slot for the checkbox label.    |
| `$slots.checked`      | Custom content for the checked state.       |
| `$slots.intermediate` | Custom content for the intermediate state.  |

<hr>

## Checkbox Group

| **Prop**     | **Type** | **Default**  | **Description**                                             |
|--------------|----------|--------------|-------------------------------------------------------------|
| `modelValue` | `Array`  | `[]`         | Array of selected values from checkboxes in the group.      |
| `size`       | `String` | `'md'`       | Sets the size of all checkboxes in the group.               |
| `align`      | `String` | `'horizontal'`| Sets the alignment of checkboxes ('horizontal' or 'vertical'). |

| **Method**    | **Description**                                                      |
|---------------|----------------------------------------------------------------------|
| `toggleAll()` | Toggles all checkboxes in the group.                                 |
| `checkAll()`  | Checks all checkboxes in the group.                                  |
| `uncheckAll()`| Unchecks all checkboxes in the group.                                |
| `isChecked(value)` | Returns whether a checkbox with the specified value is checked. |

| **Name**         | **Description**                             |
|------------------|---------------------------------------------|
| `$slots.default` | Place to put all checkbox components.       |