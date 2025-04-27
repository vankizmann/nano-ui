# Form Group

The `<n-form-group>` component is a fieldset container that groups related form items. It supports collapsible sections, custom icons, and optional tooltips for enhanced form organization.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    formGroupBinds: {
        size: 'md',
        type: 'primary',
        collapse: true,
        kind: 'classic'
    },
    formGroupVisible: true,
    formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="formGroupBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="formGroupBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Collapsible">
                <n-switch v-model="formGroupBinds.collapse">Enable collapse</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Basic Form Group</h3>
            </div>
            <div class="col--1-1">
                <n-form-group 
                    v-model="formGroupVisible"
                    v-bind="formGroupBinds"
                    label="Personal Information"
                    icon="far fa-user"
                    tooltip="Enter your personal details here"
                >
                    <template #action>
                        <n-button>$slots.action</n-button>
                    </template>
                    
                    <n-form-item prop="firstName" label="First Name">
                        <n-input v-model="formData.firstName" />
                    </n-form-item>
                    <n-form-item prop="lastName" label="Last Name">
                        <n-input v-model="formData.lastName" />
                    </n-form-item>
                    <n-form-item prop="email" label="Email">
                        <n-input v-model="formData.email" />
                    </n-form-item>
                    <n-form-item prop="phone" label="Phone">
                        <n-input v-model="formData.phone" />
                    </n-form-item>
                </n-form-group>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(formData) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Form Group

| **Prop**           | **Type**       | **Default**         | **Description**                                                                   |
|--------------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `modelValue`       | `Boolean`      | `true`              | Controls whether the form group is expanded (visible) or collapsed.               |
| `key`              | `String`       | `UUID()`            | Unique identifier for the form group.                                             |
| `label`            | `String`       | `''`                | Title text for the form group.                                                    |
| `icon`             | `String`       | `''`                | Icon class to display next to the label.                                          |
| `size`             | `String`       | `''`                | Size of the form group (overrides the form's size setting).                       |
| `kind`             | `String`       | `'classic'`         | Style variant of the form group.                                                  |
| `type`             | `String`       | `'primary'`         | Color type of the form group.                                                     |
| `align`            | `String`       | `'vertical'`        | Alignment of content within the form group ('vertical' or 'horizontal').          |
| `collapse`         | `Boolean`      | `false`             | If true, the form group can be collapsed/expanded.                                |
| `tooltip`          | `String`       | `''`                | Tooltip text to show for the form group.                                          |
| `tooltipPosition`  | `String`       | `'bottom-start'`    | Position of the tooltip.                                                          |

| **Method**            | **Description**                                                                               |
|-----------------------|-----------------------------------------------------------------------------------------------|
| `collapseGroup()`     | Toggles the collapsed state of the form group.                                                |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when the form group is expanded or collapsed.                |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content slot for the form group body.                                |
| `action`              | Optional slot for actions in the form group header.                  |