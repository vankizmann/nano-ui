# Checkbox
Checkbox with diffrent styles.

```vue
<n-checbox v-model="checked">Your label</n-checbox>
```

### Checkbox

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-checkbox v-model="checked">Check me</n-checkbox>
        </div>
        <div class="col--1-1">
            <n-checkbox v-model="checked" :disabled="true">Can't check me</n-checkbox>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                checked: true
            };
        }
    } 
</script>

```

### Grouped checkboxes

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-checkbox-group v-model="checked">
                <n-checkbox :global="true">Check all</n-checkbox>
                <n-checkbox value="berlin">Berlin</n-checkbox>
                <n-checkbox value="hamburg">Hamburg</n-checkbox>
                <n-checkbox value="munich">Munich</n-checkbox>
                <n-checkbox value="cologne">Cologne</n-checkbox>
                <n-checkbox value="frankfurt">Frankfurt</n-checkbox>
            </n-checkbox-group>
        </div>
        <div class="col--1-1">
            <pre class="pretty">{{ checked }}</pre>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                checked: ['berlin']
            };
        }
    } 
</script>

```

### Vertical grouped checkboxes

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-checkbox-group v-model="checked" align="vertical">
                <n-checkbox :global="true">Check all</n-checkbox>
                <n-checkbox value="berlin">Berlin</n-checkbox>
                <n-checkbox value="hamburg">Hamburg</n-checkbox>
                <n-checkbox value="munich">Munich</n-checkbox>
                <n-checkbox value="cologne">Cologne</n-checkbox>
                <n-checkbox value="frankfurt">Frankfurt</n-checkbox>
            </n-checkbox-group>
        </div>
        <div class="col--1-1">
            <pre class="pretty">{{ checked }}</pre>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                checked: ['berlin']
            };
        }
    } 
</script>

```

### Checkbox sizes

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-checkbox v-model="checked" size="small">Small</n-checkbox>
            <n-checkbox v-model="checked">Default</n-checkbox>
            <n-checkbox v-model="checked" size="large">Large</n-checkbox>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return {
                checked: true
            };
        }
    } 
</script>

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