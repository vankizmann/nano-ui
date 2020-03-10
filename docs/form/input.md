# Input
Input with diffrent styles.

### Input

```html
/*vue*/

    <template>
        <div class="grid grid--col grid--20-20">
            <div class="col--1-1">
                <n-input v-model="text" placeholder="Enter text" />
            </div>
            <div class="col--1-1">
                <n-input v-model="text" placeholder="Enter text" :disabled="true" />
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

### Round input

```html
/*vue*/

    <template>
        <div class="grid grid--col grid--20-20">
            <div class="col--1-1">
                <n-input v-model="text" placeholder="Enter text" :round="true" />
            </div>
            <div class="col--1-1">
                <n-input v-model="text" placeholder="Enter text" :round="true" :disabled="true" />
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

### Input with icon

```html
/*vue*/

    <template>
        <div class="grid grid--row grid--20-20">
            <div class="col--1-1 col--1-2@md">
                <n-input v-model="text" icon="fa fa-search" :icon-disabled="!canSearch" icon-position="before" @icon-click="search" />
            </div>
            <div class="col--1-1 col--1-2@md">
                <n-input v-model="text" :native-type="type" :icon="eyeIcon" icon-position="after"  @icon-click="toggle" />
            </div>
        </div>
    </template>
    
    <script>
        export default {
            data()
            {
                return { type: 'password', text: 'Top secret password' };
            },
            computed: {
                canSearch()
                {
                    return !! this.text;
                },
                eyeIcon()
                {
                    return this.type === 'text' ?
                        'fa fa-eye-slash' : 'fa fa-eye';
                }
            },
            methods: {
                toggle()
                {
                    this.type = this.type === 'text' ?
                        'password' : 'text';
                },
                search()
                {
                    window.alert('Search for: ' + this.text);
                }
            }
        } 
    </script>

```

### Input with icon

```html
/*vue*/

    <template>
        <div class="grid grid--col grid--20-20">
            <div class="col--1-1">
                <n-input value="Small" size="small" />
            </div>
            <div class="col--1-1">
                <n-input value="Default" />
            </div>
            <div class="col--1-1">
                <n-input value="Large" size="large" />
            </div>
        </div>
    </template>
    
    <script>
        export default {} 
    </script>

```

### Input group

```html
/*vue*/

    <template>
        <div class="grid grid--col grid--20-20">
            <div class="col--1-1">
                <n-button-group>
                    <n-input v-model="text" placeholder="Enter text"></n-input>
                    <n-input v-model="text" placeholder="Enter text"></n-input>
                    <n-button icon="fa fa-search">Search</n-button>
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