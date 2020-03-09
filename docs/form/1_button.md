---
layout: default
title: Button
nav_order: 1
parent: Form
---

# Button
Button with diffrent styles.

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