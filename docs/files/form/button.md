# Button
 
The `<n-button>` component is a versatile and customizable button component, providing various styling options and functionalities. Below is a detailed description of its props, methods, and usage.

## Demo

```js [demo]
pi.Obj.assign(window.VueData, {
    buttonBinds: {
        size: 'md', icon: null, iconPosition: 'before', disabled: false,
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
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@md" label="Size">
                <n-select v-model="buttonBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@md" label="Icon">
                <n-select v-model="buttonBinds.icon" placeholder="Icon" :clearable="true" :options="icons" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@md" label="Position">
                <n-select v-model="buttonBinds.iconPosition" :options="positions" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@md" label="Disabled">
                <n-switch v-model="buttonBinds.disabled">Activate disable state</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Default</h3>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" type="primary">Primary</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" type="secondary">Secondary</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" type="success">Success</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" type="warning">Warning</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" type="danger">Danger</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" type="info">Info</n-button>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Link</h3>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :link="true" type="primary">Primary</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :link="true" type="secondary">Secondary</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :link="true" type="success">Success</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :link="true" type="warning">Warning</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :link="true" type="danger">Danger</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :link="true" type="info">Info</n-button>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Square</h3>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :square="true" icon="fa fa-search" type="primary">Primary</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :square="true" icon="fa fa-envelope" type="secondary">Secondary</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :square="true" icon="fa fa-check" type="success">Success</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :square="true" icon="fa fa-star" type="warning">Warning</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :square="true" icon="fa fa-trash" type="danger">Danger</n-button>
            </div>
            <div class="col--auto">
                <n-button v-bind="buttonBinds" :square="true" icon="fa fa-user" type="info">Info</n-button>
            </div>
        </div>
    </div>
</n-form>
```

## Example

```vue
<template>
  <n-button type="primary" icon="fa fa-search" @click="window.alert('click event!')">
    Button
  </n-button>
</template>
```

## Properties

| **Prop**       | **Type**  | **Default** | **Description**                                                                                 |
|----------------|-----------|-------------|-------------------------------------------------------------------------------------------------|
| `type`         | `String`  | `'primary'` | Defines the button's style type (e.g., 'primary', 'secondary', 'success', 'warning', 'danger'). |
| `size`         | `String`  | `'md'`      | Sets the size of the button (e.g., 'sm', 'md', 'lg').                                           |
| `link`         | `Boolean` | `false`     | If true, styles the button as a link.                                                           |
| `square`       | `Boolean` | `false`     | If true, makes the button square.                                                               |
| `disabled`     | `Boolean` | `false`     | If true, disables the button.                                                                   |
| `icon`         | `String`  | `null`      | The icon class name to be used within the button.                                               |
| `iconPosition` | `String`  | `'before'`  | Sets the position of the icon relative to the button text (e.g., 'before', 'after').            |
| `nativeType`   | `String`  | `'button'`  | Sets the native HTML element type (typically 'button').                                         |
