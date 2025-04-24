# Select
Select with diffrent styles.

```vue
<n-select v-model="value">
    <n-select-option value="foo">Foo</n-select-option>
    <n-select-option value="bar">Bar</n-select-option>
</n-select>
```

### Select

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-select v-model="value">
                <n-select-option value="hamburg">Hamburg</n-select-option>
                <n-select-option value="berlin">Berlin</n-select-option>
                <n-select-option value="frankfurt" :disabled="true">Frankfurt</n-select-option>
                <n-select-option value="munich">Munich</n-select-option>
            </n-select>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { value: null };
        }
    } 
</script>

```


### Clearable select

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-select v-model="value" :clearable="true">
                <n-select-option value="hamburg">Hamburg</n-select-option>
                <n-select-option value="berlin">Berlin</n-select-option>
                <n-select-option value="frankfurt" :disabled="true">Frankfurt</n-select-option>
                <n-select-option value="munich">Munich</n-select-option>
            </n-select>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { value: null };
        }
    } 
</script>

```

### Multiple select

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-select v-model="value" :multiple="true">
                <n-select-option value="hamburg">Hamburg</n-select-option>
                <n-select-option value="berlin">Berlin</n-select-option>
                <n-select-option value="frankfurt" :disabled="true">Frankfurt</n-select-option>
                <n-select-option value="munich">Munich</n-select-option>
            </n-select>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { value: null };
        }
    } 
</script>

```

### Create new options

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-select v-model="value" :allow-create="true">
                <n-select-option value="hamburg">Hamburg</n-select-option>
                <n-select-option value="berlin">Berlin</n-select-option>
                <n-select-option value="frankfurt" :disabled="true">Frankfurt</n-select-option>
                <n-select-option value="munich">Munich</n-select-option>
            </n-select>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { value: null };
        }
    } 
</script>

```

### Select group

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button-group>
                <n-select v-model="value">
                    <n-select-option value="hamburg">Hamburg</n-select-option>
                    <n-select-option value="berlin">Berlin</n-select-option>
                    <n-select-option value="frankfurt" :disabled="true">Frankfurt</n-select-option>
                    <n-select-option value="munich">Munich</n-select-option>
                </n-select>
                <n-button icon="fa fa-pen">Edit</n-button>
            </n-button-group>
        </div>
    </div>
</template>

<script>
    export default {
        data()
        {
            return { value: null };
        }
    } 
</script>

```

### Properties
**value**  
default: null  
types: String  
_Select value_

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