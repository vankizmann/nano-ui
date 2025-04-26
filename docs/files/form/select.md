# Select

The `<n-select>` component is a customizable dropdown select component with various options to control its appearance and behavior. It supports single and multiple selection, search functionality, and custom option rendering.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    selectBinds: {
        size: 'md', 
        disabled: false, 
        type: 'primary',
        collapse: false,
        clearable: false
    },
    selectValues: {
        single: 'option1',
        multi1: ['option1', 'option2'],
        multi2: ['Foobar', 'option2']
    },
    selectOptions: {
        'option1': 'Option 1',
        'option2': 'Option 2',
        'option3': 'Option 3',
        'option4': 'Option 4',
        'option5': 'Option 5'
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="selectBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="selectBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="selectBinds.disabled">Activate disable state</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Clearable">
                <n-switch v-model="selectBinds.clearable">Enable clearable</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Collapse">
                <n-switch v-model="selectBinds.collapse">Enable collapse</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Select</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-select v-model="selectValues.single" v-bind="selectBinds" placeholder="Please select an option"  :options="selectOptions">
                    <n-select-option value="option1" label="Option 1"></n-select-option>
                    <n-select-option value="option2" label="Option 2"></n-select-option>
                    <n-select-option value="option3" label="Option 3"></n-select-option>
                    <n-select-option value="option4" label="Option 4" disabled></n-select-option>
                </n-select>
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ selectValues.single }}</code>
            </div>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Multiple Select</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-select v-model="selectValues.multi1" v-bind="selectBinds" multiple :options="selectOptions" />
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ selectValues.multi1 }}</code>
            </div>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Multiple Select with allowCreate</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-select v-model="selectValues.multi2" v-bind="selectBinds" :allow-create="true" multiple :options="selectOptions" />
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ selectValues.multi2 }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Select

| **Prop**        | **Type**  | **Default**                    | **Description**                                                                                  |
|-----------------|-----------|--------------------------------|-------------------------------------------------------------------------------------------------|
| `modelValue`    | `Any`     | `null`                         | The current value of the select.                                                                |
| `clearValue`    | `Any`     | `null`                         | The value to set when clearing the select.                                                      |
| `type`          | `String`  | `'primary'`                    | Sets the style type of the select.                                                              |
| `lazy`          | `Boolean` | `false`                        | If true, options will be loaded lazily (for better performance with large lists).               |
| `size`          | `String`  | `'md'`                         | Sets the size of the select (e.g., 'sm', 'md', 'lg').                                           |
| `position`      | `String`  | `'bottom-center'`              | Sets the position of the dropdown menu.                                                         |
| `multiple`      | `Boolean` | `false`                        | If true, enables selecting multiple options.                                                    |
| `collapse`      | `Boolean` | `true`                         | If true and multiple, collapses selected items to show only the first item and a count.         |
| `disabled`      | `Boolean` | `false`                        | If true, disables the select.                                                                   |
| `clearable`     | `Boolean` | `false`                        | If true, shows a clear button to reset the selection.                                           |
| `placeholder`   | `String`  | `'Please select'`              | Text to display when no option is selected.                                                     |
| `emptyText`     | `String`  | `'No items'`                   | Text to display when there are no options.                                                      |
| `undefinedText` | `String`  | `'Undefined item'`             | Text to display for undefined items.                                                            |
| `collapseText`  | `String`  | `'+:count item\|+:count items'` | Format for collapsed items count text.                                             |
| `allowCreate`   | `Boolean` | `false`                        | If true, allows creating new options based on the search text.                                  |
| `options`       | `Object`  | `{}`                           | Array or object of options to use instead of select-option components.                          |
| `optionsValue`  | `String`  | `'$index'`                     | Path to the value property when using the options prop.                                         |
| `optionsLabel`  | `String`  | `'$value'`                     | Path to the label property when using the options prop.                                         |
| `optionsDisabled` | `String`  | `'null'`                       | Path to the disabled property when using the options prop.                                      |

| **Method**              | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `clear()`               | Clears the current selection.                                        |


| **Name**         | **Description**                             |
|------------------|---------------------------------------------|
| `$slots.default` | Place to put select-option components.      |

<hr>

## Select Option

| **Prop**     | **Type**     | **Default** | **Description**                                              |
|--------------|--------------|-------------|--------------------------------------------------------------|
| `value`      | `Any`        | `''`        | The value of the option.                                     |
| `label`      | `Any`        | `null`      | The display label of the option.                             |
| `valueProp`  | `String`     | `null`      | Path to the value property when value is an object.          |
| `labelProp`  | `String`     | `null`      | Path to the label property when value is an object.          |
| `disabled`   | `Boolean`    | `false`     | If true, disables the option.                                |


| **Name**         | **Description**                             |
|------------------|---------------------------------------------|
| `$slots.default` | Content to display as the option label.     |