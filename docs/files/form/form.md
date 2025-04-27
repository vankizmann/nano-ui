# Form

The `<n-form>` component and its child `<n-form-item>` components provide a structured way to create forms with validation, labels, error handling, and conditional field display.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    formBinds: {
        size: 'md',
        align: 'vertical',
        prevent: true
    },
    formData: {
        name: '',
        email: '',
        age: null,
        subscribe: false
    },
    formErrors: {}
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="formBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Align">
                <n-select v-model="formBinds.align" :options="aligns" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Basic Form</h3>
            </div>
            <div class="col--1-1">
                <n-form v-bind="formBinds" :form="formData" :errors="formErrors">
                    <n-form-item prop="name" label="Name" tooltip="Enter your full name">
                        <n-input v-model="formData.name" />
                    </n-form-item>
                    <n-form-item prop="email" label="Email">
                        <n-input v-model="formData.email" />
                    </n-form-item>
                    <n-form-item prop="age" label="Age" conditional v-model="formData.showAge">
                        <n-input v-model="formData.age" type="number" />
                    </n-form-item>
                    <n-form-item prop="subscribe" label="Subscribe to newsletter">
                        <n-switch v-model="formData.subscribe">Subscribe to newsletter</n-switch>
                    </n-form-item>
                    <div class="grid grid--row grid--wrap grid--20-20">
                        <div class="col--auto">
                            <n-button type="primary" @click="formErrors = { name: 'Name is required' }">Show Error</n-button>
                        </div>
                        <div class="col--auto">
                            <n-button type="default" @click="formErrors = {}">Clear Errors</n-button>
                        </div>
                    </div>
                </n-form>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(formData) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Form

| **Prop**        | **Type**       | **Default**       | **Description**                                                                   |
|-----------------|----------------|-------------------|-----------------------------------------------------------------------------------|
| `dom`           | `String`       | `'div'`           | HTML element to render the form as.                                               |
| `form`          | `Object`       | `{}`              | Form data object.                                                                 |
| `errors`        | `Object`       | `{}`              | Form validation errors object (keys should match form-item prop names).           |
| `size`          | `String`       | `'md'`            | Sets the size of all form items (e.g., 'sm', 'md', 'lg').                         |
| `align`         | `String`       | `'vertical'`      | Form layout alignment ('vertical' or 'horizontal').                               |
| `prevent`       | `Boolean`      | `true`            | If true, prevents default form submission behavior.                               |
| `ignore`        | `Array`        | `['modified', 'dragid']` | Properties to ignore when detecting changes in the form data.              |
| `forceChange`   | `Boolean`      | `false`           | If true, forces change events even if the form data hasn't changed.               |
| `forceErrors`   | `Boolean`      | `true`            | If true, always shows validation errors.                                          |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `resetChange()`       | Resets the change detection tracking.                                |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `change`              | Emitted when the form data changes.                                  |
| `submit`              | Emitted when the form is submitted.                                  |

<hr>

## Form Item

| **Prop**           | **Type**       | **Default**         | **Description**                                                                   |
|--------------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `modelValue`       | `Boolean`      | `true`              | Used to control conditional form items.                                           |
| `prop`             | `String`       | `'id'`              | Property name in the form data that this form item is linked to.                  |
| `label`            | `String`       | `''`                | Label text for the form item.                                                     |
| `size`             | `String`       | `''`                | Size of the form item (overrides the form's size setting).                        |
| `tooltip`          | `String`       | `''`                | Tooltip text to show next to the label.                                           |
| `tooltipPosition`  | `String`       | `'bottom-start'`    | Position of the tooltip.                                                          |
| `tooltipWindow`    | `Boolean`      | `false`             | If true, shows the tooltip in a separate window.                                  |
| `conditional`      | `Boolean`      | `false`             | If true, this form item can be conditionally enabled/disabled.                    |
| `conditionOn`      | `String`       | `'Enable field'`    | Text to show when the form item is disabled and can be enabled.                   |
| `conditionOff`     | `String`       | `'Disable field'`   | Text to show when the form item is enabled and can be disabled.                   |

| **Method**            | **Description**                                                                               |
|-----------------------|-----------------------------------------------------------------------------------------------|
| `enabled()`           | Returns whether the form item is enabled.                                                     |
| `disabled()`          | Returns whether the form item is disabled.                                                    |
| `toggleCondition()`   | Toggles the conditional state of the form item.                                               |
| `focusInput()`        | Focuses on the input element within the form item.                                            |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content slot for the form item input element.                        |
| `label`               | Custom content for the form item label.                              |
| `tooltip`             | Custom content for the tooltip.                                      |