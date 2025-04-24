# Textarea
Textarea with diffrent styles.

```vue
<n-textarea v-model="text"></n-textarea>
```

### Textarea

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-textarea v-model="text" placeholder="Enter text" />
        </div>
        <div class="col--1-1">
            <n-textarea v-model="text" placeholder="Enter text" :disabled="true" />
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { text: '' };
        }
    } 
</script>

```

### Textarea with autorow

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-textarea v-model="text" placeholder="Enter text" :auto-rows="true" :min-rows="2" />
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { text: '' };
        }
    } 
</script>

```


### Properties
**value**  
default: null  
types: String  
_Textarea value_

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
    /* Allows all types which are supported by native type, but overrides default textarea event */
    NDraggable.$on('textarea', (value) => {
        console.log(value);
    });
```