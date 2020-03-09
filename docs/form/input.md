---
layout: default
title: Input
nav_order: 2
has_children: false
---

# Input
Button with diffrent styles.

```vue
<n-input v-model="somevar"></n-input>
```

### Properties
**value**  
default: null  
types: String  
_Input value_

**size**  
default: 'default'  
types: String  
_Button size (small, default, large)_

**round**  
default: false  
types: Boolean  
_If button is rounded_

**disabled**  
default: false  
types: Boolean  
_If button uses disabled style and mode_

**icon**  
default: ''  
types: String  
_Icon class (fa fa-times)_

**iconDisabled**  
default: false  
types: Boolen  
_If icon button will be disabled_

**nativeType**  
default: 'button'  
types: String  
_Native button type (a, button, div etc.)_

### Events
```javascript
    /* Allows all types which are supported by native type, but overrides default input event */
    NDraggable.$on('input', (value) => {
        console.log(value);
    });
```