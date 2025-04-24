# Datepicker
Datepicker with diffrent styles.

```vue
<n-datepicker v-model="text"></n-datepicker>
```

### Datepicker

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-datepicker v-model="timestamp" placeholder="Select date" />
        </div>
        <div class="col--1-1">
            <n-datepicker v-model="timestamp" placeholder="Select date" :disabled="true" />
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { timestamp: 'now+2days' };
        }
    } 
</script>

```


### Properties
**value**  
default: null  
types: String  
_Datepicker value_

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
    /* Allows all types which are supported by native type, but overrides default datepicker event */
    NDraggable.$on('datepicker', (value) => {
        console.log(value);
    });
```