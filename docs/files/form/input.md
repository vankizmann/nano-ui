# NInput

The `<n-input>` component provides a customizable input field with optional icon support.

## Demo

```js [demo]
pi.Obj.assign(window.VueData, {
    inputBinds: {
        size: 'md', type: 'primary', icon: null, iconPosition: 'after', disabled: false, placeholder: 'Enter your text'
    },
    inputReact: {
        model: ''
    },
    positions: {
        'before': 'Before', 'after': 'After'
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="inputBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="inputBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Icon">
                <n-select v-model="inputBinds.icon" placeholder="Icon" :clearable="true" :options="icons" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="inputBinds.disabled">Activate disable state</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--auto">
                <n-input v-model="inputReact.model" v-bind="inputBinds" placeholder="Enter your text" />
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ inputReact }}</code>
            </div>
        </div>
    </div>
</n-form>
```

## Example

```vue
<template>
  <n-input v-model="modelValue" placeholder="Enter text" />
</template>

<script>
export default {
  data() {
    return {
      modelValue: 'foobar',
    };
  },
};
</script>
```

In this example, an `NInput` component is used to create an input field. The value of the input is bound to the `modelValue` data property using `v-model`.

## Properties

| Prop              | Type      | Default    | Description                                                                                          |
|-------------------|-----------|------------|------------------------------------------------------------------------------------------------------|
| `modelValue`      | `String`  | `null`     | The value of the input field.                                                                       |
| `type`            | `String`  | `'primary'` | The type of the input field.                                                                        |
| `size`            | `String`  | `'md'`     | The size of the input field. Can be `'sm'`, `'md'`, or `'lg'`.                                       |
| `disabled`        | `Boolean` | `false`    | Whether the input field is disabled.                                                                 |
| `placeholder`     | `String`  | `''`       | The placeholder text for the input field.                                                            |
| `icon`            | `String`  | `''`     | The name of the icon to display.                                                                     |
| `iconPosition`    | `String`  | `'after'`  | The position of the icon relative to the input field (`'before'` or `'after'`).                       |
| `iconDisabled`    | `Boolean` | `null`     | Whether the icon is disabled. If `null`, it will use the input's disabled state.                      |
| `nativeType`      | `String`  | `'text'`   | The native type of the input field (`'text'`, `'password'`, `'email'`, etc.).                         |

## Events

| Event Name      | Description                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------|
| `icon-click`   | Emitted when the icon is clicked.                                                                     |
