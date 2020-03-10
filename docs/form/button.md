# Button
Button with diffrent styles.

```vue
<n-button @click="somevar = false">Button text</n-button>
```

### Basic buttons

```html
/*vue*/

    <template>
        <div class="grid grid--col grid--20-20">
            <div class="col--1-1">
                <n-button type="primary">Primary</n-button>
                <n-button type="secondary">Secondary</n-button>
                <n-button type="success">Success</n-button>
                <n-button type="warning">Warning</n-button>
                <n-button type="danger">Danger</n-button>
                <n-button type="info">Info</n-button>
            </div>
            <div class="col--1-1">
                <n-button type="primary" :disabled="true">Primary</n-button>
                <n-button type="secondary" :disabled="true">Secondary</n-button>
                <n-button type="success" :disabled="true">Success</n-button>
                <n-button type="warning" :disabled="true">Warning</n-button>
                <n-button type="danger" :disabled="true">Danger</n-button>
                <n-button type="info" :disabled="true">Info</n-button>
            </div>
    </template>
    
    <script>
        export default {} 
    </script>

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
                <n-button type="success" :icon="icons.success" icon-position="after">Success</n-button>
                <n-button type="warning" :icon="icons.warning" icon-position="before">Warning</n-button>
                <n-button type="danger" :icon="icons.danger" icon-position="after">Danger</n-button>
                <n-button type="info" :icon="icons.info" icon-position="before">Info</n-button>
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