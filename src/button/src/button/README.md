# NButton
Button with diffrent styles.

```vue
<n-button @click="somevar = false">Button text</n-button>
```

### Properties
**type**  
default: 'primary'  
types: String  
_Button type (primary, secondary, succes, warning, danger, info, link)_

**size**  
default: 'default'  
types: String  
_Button size (small, default, large)_

**square**  
default: false  
types: Boolean  
_If button is square, helpful for only icon buttons_

**round**  
default: false  
types: Boolean  
_If button is rounded_

**outline**  
default: false  
types: Boolean  
_If button uses outline style_

**disabled**  
default: false  
types: Boolean  
_If button uses disabled style and mode_

**icon**  
default: ''  
types: String  
_Icon class (fa fa-times)_

**nativeType**  
default: 'button'  
types: String  
_Native button type (a, button, div etc.)_

### Events
```javascript
    /* Allows all types which are supported by native type */
    NDraggable.$on('click', (event) => {
        console.log(event);
    });
```