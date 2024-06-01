# Timepicker
Timepicker with diffrent styles.

```vue
<n-timepicker v-model="text"></n-timepicker>
```

### Timepicker

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-timepicker v-model="timestamp" placeholder="Select time" />
        </div>
        <div class="col--1-1">
            <n-timepicker v-model="timestamp" placeholder="Select time" :disabled="true" />
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { timestamp: 'now+2hours' };
        }
    } 
</script>

```


### Properties
**value**  
default: null  
types: String  
_Timepicker value_

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
    /* Allows all types which are supported by native type, but overrides default timepicker event */
    NDraggable.$on('timepicker', (value) => {
        console.log(value);
    });
```