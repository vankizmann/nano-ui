# Radio
Radio with diffrent styles.

```vue
<n-radio-group v-model="checked">
    <n-radio value="berlin">Berlin</n-radio>
    <n-radio value="hamburg">Hamburg</n-radio>
</n-radio-group>
```

### Radios

```html
/*vue*/

    <template>
        <div class="grid grid--col grid--20-20">
            <div class="col--1-1">
            <n-radio-group v-model="checked">
                <n-radio value="berlin">Berlin</n-radio>
                <n-radio value="hamburg">Hamburg</n-radio>
            </n-radio-group>
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
                    checked: 'berlin'
                };
            }
        } 
    </script>

```

### Vertical radios

```html
/*vue*/

    <template>
        <div class="grid grid--col grid--20-20">
            <div class="col--1-1">
            <n-radio-group v-model="checked" align="vertical">
                <n-radio value="berlin">Berlin</n-radio>
                <n-radio value="hamburg">Hamburg</n-radio>
            </n-radio-group>
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
                    checked: 'berlin'
                };
            }
        } 
    </script>

```

### Radio sizes

```html
/*vue*/

    <template>
        <div class="grid grid--col grid--20-20">
            <div class="col--1-1">
            <n-radio-group v-model="checked">
                <n-radio value="berlin" size="small">Berlin</n-radio>
                <n-radio value="hamburg">Hamburg</n-radio>
                <n-radio value="munich" size="large">Munich</n-radio>
            </n-radio-group>
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
                    checked: 'berlin'
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