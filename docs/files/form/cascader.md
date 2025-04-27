# Cascader

The `<n-cascader>` component is a dropdown selection component for navigating hierarchical data. It allows users to select from cascading submenus that appear based on previous selections.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    cascaderBinds: {
        size: 'md', 
        type: 'primary',
        disabled: false,
        clearable: true
    },
    cascaderValue: [],
    cascaderOptions: [
        {
            value: 'electronics',
            label: 'Electronics',
            children: [
                {
                    value: 'smartphones',
                    label: 'Smartphones',
                    children: [
                        { value: 'apple', label: 'Apple' },
                        { value: 'samsung', label: 'Samsung' },
                        { value: 'xiaomi', label: 'Xiaomi' }
                    ]
                },
                {
                    value: 'laptops',
                    label: 'Laptops',
                    children: [
                        { value: 'dell', label: 'Dell' },
                        { value: 'hp', label: 'HP' },
                        { value: 'lenovo', label: 'Lenovo' }
                    ]
                }
            ]
        },
        {
            value: 'clothing',
            label: 'Clothing',
            children: [
                {
                    value: 'mens',
                    label: 'Men\'s',
                    children: [
                        { value: 'shirts', label: 'Shirts' },
                        { value: 'pants', label: 'Pants' },
                        { value: 'shoes', label: 'Shoes' }
                    ]
                },
                {
                    value: 'womens',
                    label: 'Women\'s',
                    children: [
                        { value: 'dresses', label: 'Dresses' },
                        { value: 'skirts', label: 'Skirts' },
                        { value: 'shoes', label: 'Shoes' }
                    ]
                }
            ]
        }
    ]
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="cascaderBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="cascaderBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="cascaderBinds.disabled">Disable cascader</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Clearable">
                <n-switch v-model="cascaderBinds.clearable">Enable clear button</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Hover Cascader</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-cascader v-model="cascaderValue" trigger="hover" v-bind="cascaderBinds" :options="cascaderOptions"></n-cascader>
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ $root.print(cascaderValue) }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Click Cascader</h3>
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-cascader v-model="cascaderValue" trigger="click" v-bind="cascaderBinds" :options="cascaderOptions"></n-cascader>
            </div>
            <div class="col--1-1 col--1-2@md">
                <code style="white-space: initial">{{ $root.print(cascaderValue) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Cascader

| **Prop**        | **Type**       | **Default**       | **Description**                                                                   |
|-----------------|----------------|-------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Array`        | `[]`              | The current selected values.                                                      |
| `clearValue`    | `Array`        | `[]`              | The value to set when clearing the selection.                                     |
| `options`       | `Array`        | `[]`              | Array of options to display in the cascader.                                      |
| `current`       | `Any`          | `null`            | Currently selected value.                                                         |
| `placeholder`   | `String`       | `'Please select'` | Placeholder text when no option is selected.                                      |
| `disabled`      | `Boolean`      | `false`           | If true, disables the cascader.                                                   |
| `clearable`     | `Boolean`      | `false`           | If true, shows a button to clear the selection.                                   |
| `size`          | `String`       | `'md'`            | Sets the size of the cascader (e.g., 'sm', 'md', 'lg').                           |
| `type`          | `String`       | `'primary'`       | Sets the style type of the cascader.                                              |
| `position`      | `String`       | `'bottom-start'`  | Position of the dropdown relative to the input.                                   |
| `trigger`       | `String`       | `'hover'`         | Trigger mode for cascading menus ('hover' or 'click').                            |
| `labelProp`     | `String`       | `'label'`         | Property name for option label.                                                   |
| `valueProp`     | `String`       | `'value'`         | Property name for option value.                                                   |
| `childProp`     | `String`       | `'children'`      | Property name for option children.                                                |
| `disabledProp`  | `String`       | `'disabled'`      | Property name for option disabled state.                                          |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `clearCascader()`     | Clears the selected values.                                          |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when the selection changes.                                  |
| `update:hover`        | Emitted when the hover state changes.                                |

<hr>

## Cascader Panel

| **Prop**        | **Type**       | **Default**       | **Description**                                                                   |
|-----------------|----------------|-------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Array`        | `[]`              | The current selected values.                                                      |
| `clearValue`    | `Array`        | `[]`              | The value to set when clearing the selection.                                     |
| `hover`         | `Array`        | `[]`              | The current hover path.                                                           |
| `options`       | `Array`        | `[]`              | Array of options to display in the panel.                                         |
| `disabled`      | `Boolean`      | `false`           | If true, disables the panel.                                                      |
| `size`          | `String`       | `'md'`            | Sets the size of the panel.                                                       |
| `type`          | `String`       | `'primary'`       | Sets the style type of the panel.                                                 |
| `trigger`       | `String`       | `'hover'`         | Trigger mode for cascading menus ('hover' or 'click').                            |
| `labelProp`     | `String`       | `'label'`         | Property name for option label.                                                   |
| `valueProp`     | `String`       | `'value'`         | Property name for option value.                                                   |
| `childProp`     | `String`       | `'children'`      | Property name for option children.                                                |
| `disabledProp`  | `String`       | `'disabled'`      | Property name for option disabled state.                                          |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `clearCascader()`     | Clears the selected values.                                          |
| `hoverItem(cascade)`  | Sets the current hover path.                                         |
| `selectItem(cascade)` | Selects the specified cascade path.                                  |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when the selection changes.                                  |
| `update:hover`        | Emitted when the hover path changes.                                 |