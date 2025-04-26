# Switch

The `<n-switch>` component is a customizable switch component with various options to control its appearance and behavior. Below is a detailed description of its props, methods, and usage.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    switchBinds: {
        size: 'md', 
        disabled: false,
        onType: 'primary',
        offType: 'default'
    },
    switchValues: {
        standard: true,
        custom: 'foo'
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="switchBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="OnType">
                <n-select v-model="switchBinds.onType" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="OffType">
                <n-select v-model="switchBinds.offType" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="switchBinds.disabled">Activate disable state</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Default</h3>
            </div>
            <div class="col--auto">
                <n-switch :model-value="true" v-bind="switchBinds" on-type="primary" off-type="default">Primary</n-switch>
            </div>
            <div class="col--auto">
                <n-switch :model-value="true" v-bind="switchBinds" on-type="secondary" off-type="default">Secondary</n-switch>
            </div>
            <div class="col--auto">
                <n-switch :model-value="false" v-bind="switchBinds" on-type="success" off-type="default">Success</n-switch>
            </div>
            <div class="col--auto">
                <n-switch :model-value="true" v-bind="switchBinds" on-type="warning" off-type="default">Warning</n-switch>
            </div>
            <div class="col--auto">
                <n-switch :model-value="false" v-bind="switchBinds" on-type="danger" off-type="default">Danger</n-switch>
            </div>
            <div class="col--auto">
                <n-switch :model-value="false" v-bind="switchBinds" on-type="info" off-type="default">Info</n-switch>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ switchValues.standard }}</code>
            </div>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>With custom values</h3>
            </div>
            <div class="col--auto">
                <n-switch v-model="switchValues.custom" v-bind="switchBinds" on-value="foo" off-value="bar">Switch between two strings</n-switch>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ switchValues.custom }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Switch

| **Prop**     | **Type**            | **Default** | **Description**                                                                                  |
|--------------|---------------------|-------------|--------------------------------------------------------------------------------------------------|
| `modelValue` | `Any`               | `false`     | The current value of the switch.                                                                 |
| `onValue`    | `Any`               | `true`      | The value when the switch is turned on.                                                          |
| `offValue`   | `Any`               | `false`     | The value when the switch is turned off.                                                         |
| `onType`     | `String`            | `'primary'` | The style type when the switch is on (e.g., 'primary', 'secondary').                             |
| `offType`    | `String`            | `'default'` | The style type when the switch is off.                                                           |
| `size`       | `String`            | `'md'`      | Sets the size of the switch (e.g., 'sm', 'md', 'lg').                                            |
| `disabled`   | `Boolean`           | `false`     | If true, disables the switch.                                                                    |

| **Name**         | **Description**                             |
|------------------|---------------------------------------------|
| `$slots.default` | Content for the switch label.               |