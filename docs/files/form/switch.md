# Switch

The `<n-switch>` component is a customizable switch component with various options to control its appearance and behavior. Below is a detailed description of its props, methods, and usage.


## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    switchBinds: {
        size: 'md', disabled: false,
    },
    switchReact: {
        modelValue: 'foo'
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item label="Size" class="col--auto">
                <n-select v-model="switchBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item label="Disabled" class="col--auto">
                <n-switch v-model="switchBinds.disabled">Activate disable state</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--center">
            <div class="col--auto">
                <n-switch :model-value="true" v-bind="switchBinds" on-type="primary">Primary</n-switch>
            </div>
            <div class="col--auto">
                <n-switch v-bind="switchBinds" on-type="secondary">Secondary</n-switch>
            </div>
            <div class="col--auto">
                <n-switch :model-value="true" v-bind="switchBinds" on-type="success">Success</n-switch>
            </div>
            <div class="col--auto">
                <n-switch v-bind="switchBinds" on-type="warning">Warning</n-switch>
            </div>
            <div class="col--auto">
                <n-switch v-bind="switchBinds" on-type="danger">Danger</n-switch>
            </div>
            <div class="col--auto">
                <n-switch v-bind="switchBinds" on-type="info">Info</n-switch>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--center grid--middle">
            <div class="col--auto">
                <n-switch v-bind="switchBinds" off-type="danger" on-type="success">Danger / Success</n-switch>
            </div>
            <div class="col--auto">
                <n-switch v-model="switchReact.modelValue" v-bind="switchBinds" on-value="foo" off-value="bar">Switch between to strings</n-switch>
            </div>
            <div class="col--auto">
                <code style="white-space: initial">{{ switchReact }}</code>
            </div>
        </div>
    </div>
</n-form>
```

```vue
<template>
  <n-switch v-model="toggleState" on-value="yes" off-value="no" @click="window.alert('Switch toggled!')">
    Toggle Switch
  </n-switch>
</template>
<script>
  export default {
      data() {
          return { toggleState: 'yes' };
      }
  }
</script>

```

## Properties

| **Prop**     | **Type**            | **Default** | **Description**                                                                                  |
|--------------|---------------------|-------------|--------------------------------------------------------------------------------------------------|
| `modelValue` | `Boolean`           | `false`     | The current value of the switch.                                                                 |
| `onValue`    | `Any`               | `true`      | The value when the switch is turned on.                                                          |
| `offValue`   | `Any`               | `false`     | The value when the switch is turned off.                                                         |
| `onType`     | `String`            | `'primary'` | The style type when the switch is on (e.g., 'primary', 'secondary').                             |
| `offType`    | `String`            | `'default'` | The style type when the switch is off.                                                           |
| `size`       | `String`            | `'md'`      | Sets the size of the switch (e.g., 'sm', 'md', 'lg').                                            |
| `disabled`   | `Boolean`           | `false`     | If true, disables the switch.                                                                    |
