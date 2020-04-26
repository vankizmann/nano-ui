# Cascader
Cascader with diffrent styles.

```vue
<n-cascader v-model="value">
    <n-cascader-option value="foo">Foo</n-cascader-option>
    <n-cascader-option value="bar">Bar</n-cascader-option>
</n-cascader>
```

### Cascader

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-cascader v-model="value">
                <n-cascader-option value="hamburg">Hamburg</n-cascader-option>
                <n-cascader-option value="berlin">Berlin</n-cascader-option>
                <n-cascader-option value="frankfurt" :disabled="true">Frankfurt</n-cascader-option>
                <n-cascader-option value="munich">Munich</n-cascader-option>
            </n-cascader>
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


### Clearable cascader

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-cascader v-model="value" :clearable="true">
                <n-cascader-option value="hamburg">Hamburg</n-cascader-option>
                <n-cascader-option value="berlin">Berlin</n-cascader-option>
                <n-cascader-option value="frankfurt" :disabled="true">Frankfurt</n-cascader-option>
                <n-cascader-option value="munich">Munich</n-cascader-option>
            </n-cascader>
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

### Multiple cascader

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-cascader v-model="value" :multiple="true">
                <n-cascader-option value="hamburg">Hamburg</n-cascader-option>
                <n-cascader-option value="berlin">Berlin</n-cascader-option>
                <n-cascader-option value="frankfurt" :disabled="true">Frankfurt</n-cascader-option>
                <n-cascader-option value="munich">Munich</n-cascader-option>
            </n-cascader>
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
            <n-cascader v-model="value" :allow-create="true">
                <n-cascader-option value="hamburg">Hamburg</n-cascader-option>
                <n-cascader-option value="berlin">Berlin</n-cascader-option>
                <n-cascader-option value="frankfurt" :disabled="true">Frankfurt</n-cascader-option>
                <n-cascader-option value="munich">Munich</n-cascader-option>
            </n-cascader>
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

### Cascader group

```html
/*vue*/

<template>
    <div class="grid grid--col grid--20-20">
        <div class="col--1-1">
            <n-button-group>
                <n-cascader v-model="value" :options="options" />
                <n-button icon="fa fa-pen">Edit</n-button>
            </n-button-group>
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
_Cascader value_

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