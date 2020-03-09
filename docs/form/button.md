# Button
Button with diffrent styles.

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
            <div class="col--1-1">
                <n-button type="primary" :round="true">Primary</n-button>
                <n-button type="secondary" :round="true">Secondary</n-button>
                <n-button type="success" :round="true">Success</n-button>
                <n-button type="warning" :round="true">Warning</n-button>
                <n-button type="danger" :round="true">Danger</n-button>
                <n-button type="info" :round="true">Info</n-button>
            </div>
            <div class="col--1-1">
                <n-button type="primary" :round="true" :disabled="true">Primary</n-button>
                <n-button type="secondary" :round="true" :disabled="true">Secondary</n-button>
                <n-button type="success" :round="true" :disabled="true">Success</n-button>
                <n-button type="warning" :round="true" :disabled="true">Warning</n-button>
                <n-button type="danger" :round="true" :disabled="true">Danger</n-button>
                <n-button type="info" :round="true" :disabled="true">Info</n-button>
            </div>
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
            <div class="col--1-1">
                <n-button type="primary" :plain="true" :round="true">Primary</n-button>
                <n-button type="secondary" :plain="true" :round="true">Secondary</n-button>
                <n-button type="success" :plain="true" :round="true">Success</n-button>
                <n-button type="warning" :plain="true" :round="true">Warning</n-button>
                <n-button type="danger" :plain="true" :round="true">Danger</n-button>
                <n-button type="info" :plain="true" :round="true">Info</n-button>
            </div>
            <div class="col--1-1">
                <n-button type="primary" :plain="true" :round="true" :disabled="true">Primary</n-button>
                <n-button type="secondary" :plain="true" :round="true" :disabled="true">Secondary</n-button>
                <n-button type="success" :plain="true" :round="true" :disabled="true">Success</n-button>
                <n-button type="warning" :plain="true" :round="true" :disabled="true">Warning</n-button>
                <n-button type="danger" :plain="true" :round="true" :disabled="true">Danger</n-button>
                <n-button type="info" :plain="true" :round="true" :disabled="true">Info</n-button>
            </div>
        </div>
    </template>
    
    <script>
        export default {} 
    </script>

```

```vue
<n-button @click="somevar = false">Button text</n-button>
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