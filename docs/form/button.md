# Button


```js [demo]
    pi.Obj.assign(window.VueData, {
        button: {
            size: 'md', icon: null, square: false, link: false, disabled: false,
        },
        sizes: {
            'sm': 'Small', 'md': 'Medium', 'lg': 'Large'
        },
        icons: {
            'fa fa-ghost': 'Ghost', 'fa fa-plus': 'Plus', 'fa fa-minus': 'Minus'
        }
    });
```

Button with diffrent styles.

```html [demo]

<div>
    <div>
        FOOOBAR
    </div>
</div>
```

### Basic buttons

```html [demo]

<div class="app-options grid grid--row grid--wrap grid--30-30">
    <div class="col--auto">
        <n-select style="width: 100px;" v-model="button.size" :options="sizes" />
    </div>
    <div class="col--auto">
        <n-select style="width: 200px;" v-model="button.icon" placeholder="Icon" :clearable="true" :options="icons" />
    </div>
    <div class="col--auto">
        <n-checkbox v-model="button.square">Square</n-checkbox>
    </div>
    <div class="col--auto">
        <n-checkbox v-model="button.link">Link</n-checkbox>
    </div>
    <div class="col--auto">
        <n-checkbox v-model="button.disabled">Disabled</n-checkbox>
    </div>
</div>

<div class="grid grid--row grid--wrap grid--10-10">
    <div class="col--1-1 col--1-3@md">
        <n-button v-bind="button" type="primary">Button</n-button>
    </div>
    <div class="col--1-1 col--1-3@md">
        <n-button v-bind="button" type="secondary">Button</n-button>
    </div>
    <div class="col--1-1 col--1-3@md">
        <n-button v-bind="button" type="success">Button</n-button>
    </div>
    <div class="col--1-1 col--1-3@md">
        <n-button v-bind="button" type="warning">Button</n-button>
    </div>
    <div class="col--1-1 col--1-3@md">
        <n-button v-bind="button" type="danger">Button</n-button>
    </div>
    <div class="col--1-1 col--1-3@md">
        <n-button v-bind="button" type="info">Button</n-button>
    </div>
</div>
```

### Plain buttons

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button type="primary" :plain="true">Primary</n-button>
            <n-button type="secondary" :plain="true">Secondary</n-button>
            <n-button type="success" :plain="true">Success</n-button>
            <n-button type="warning" :plain="true">Warning</n-button>
            <n-button type="danger" :plain="true">Danger</n-button>
            <n-button type="info" :plain="true">Info</n-button>
        </div>
        <div class="col--1-1">
            <n-button type="primary" :plain="true" :disabled="true">Primary</n-button>
            <n-button type="secondary" :plain="true" :disabled="true">Secondary</n-button>
            <n-button type="success" :plain="true" :disabled="true">Success</n-button>
            <n-button type="warning" :plain="true" :disabled="true">Warning</n-button>
            <n-button type="danger" :plain="true" :disabled="true">Danger</n-button>
            <n-button type="info" :plain="true" :disabled="true">Info</n-button>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

```

### Rounded buttons

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button type="primary" :round="true">Primary</n-button>
            <n-button type="secondary" :round="true">Secondary</n-button>
            <n-button type="success" :round="true">Success</n-button>
            <n-button type="warning" :round="true">Warning</n-button>
            <n-button type="danger" :round="true">Danger</n-button>
            <n-button type="info" :round="true">Info</n-button>
        </div>
        <div class="col--1-1">
            <n-button type="primary" :round="true" :plain="true">Primary</n-button>
            <n-button type="secondary" :round="true" :plain="true">Secondary</n-button>
            <n-button type="success" :round="true" :plain="true">Success</n-button>
            <n-button type="warning" :round="true" :plain="true">Warning</n-button>
            <n-button type="danger" :round="true" :plain="true">Danger</n-button>
            <n-button type="info" :round="true" :plain="true">Info</n-button>
        </div>
</template>

<script>
    export default {}
</script>

```

### Link buttons

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button type="primary" :link="true">Primary</n-button>
            <n-button type="success" :link="true">Success</n-button>
            <n-button type="warning" :link="true">Warning</n-button>
            <n-button type="danger" :link="true">Danger</n-button>
            <n-button type="info" :link="true">Info</n-button>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

```

### Buttons with icon

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button type="primary" :icon="icons.primary" icon-position="before">Primary</n-button>
            <n-button type="success" :icon="icons.success" icon-position="before">Success</n-button>
            <n-button type="warning" :icon="icons.warning" icon-position="before">Warning</n-button>
            <n-button type="danger" :icon="icons.danger" icon-position="before">Danger</n-button>
            <n-button type="info" :icon="icons.info" icon-position="before">Info</n-button>
        </div>
        <div class="col--1-1">
            <n-button type="primary" :plain="true" :icon="icons.primary" icon-position="after">Primary</n-button>
            <n-button type="success" :plain="true" :icon="icons.success" icon-position="after">Success</n-button>
            <n-button type="warning" :plain="true" :icon="icons.warning" icon-position="after">Warning</n-button>
            <n-button type="danger" :plain="true" :icon="icons.danger" icon-position="after">Danger</n-button>
            <n-button type="info" :plain="true" :icon="icons.info" icon-position="after">Info</n-button>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

```

### Buttons with only icon

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button type="primary" :icon="icons.primary" :square="true"></n-button>
            <n-button type="success" :icon="icons.success" :square="true" :round="true"></n-button>
            <n-button type="warning" :icon="icons.warning" :square="true"></n-button>
            <n-button type="danger" :icon="icons.danger" :square="true" :round="true"></n-button>
            <n-button type="info" :icon="icons.info" :square="true"></n-button>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

```

### Button group

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button-group>
                <n-button type="primary" :icon="icons.angleLeft" icon-position="before">Previous</n-button>
                <n-button type="primary" :icon="icons.angleRight" icon-position="after">Previous</n-button>
            </n-button-group>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

```

### Button sizes

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button type="primary" size="mini">Mini</n-button>
            <n-button type="primary" size="small">Small</n-button>
            <n-button type="primary">Default</n-button>
            <n-button type="primary" size="large">Large</n-button>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

```

### Button native type

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button type="primary" native-type="a" href="http://google.com" target="_blank">www.google.com</n-button>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

```

### Properties

**type**  
default: 'primary'  
types: String  
_Button type (primary, secondary, succes, warning, danger, info)_

**type**  
default: 'link'  
types: Boolean  
_Applies link styling for button_

**size**  
default: null  
types: String  
_Button size (mini, small, large)_

**square**  
default: false  
types: Boolean  
_If button is square, helpful for only icon buttons_

**round**  
default: false  
types: Boolean  
_If button is rounded_

**plain**  
default: false  
types: Boolean  
_If button uses plain style_

**disabled**  
default: false  
types: Boolean  
_If button uses disabled style and mode_

**icon**  
default: ''  
types: String  
_Icon class (fa fa-times)_

**iconPosition**  
default: 'before'  
types: String  
_Icon position (before, after)_

**nativeType**  
default: 'button'  
types: String  
_Native button type (a, button, div etc.)_

### Events

```javascript
    /* Allows all types which are supported by native type */
NButton.$on('click', (event) => {
    console.log(event);
});
```