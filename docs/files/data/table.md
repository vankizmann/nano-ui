# Table
Draggable table with diffrent styles.

```js [demo]
var generate = function (count, loop) {
    return pi.Arr.each(pi.Arr.make(count), (index) => {

        var item = {
            id: 'item-' + pi.UUID(), label: 'Item ' + index, image: 'https://picsum.photos/260/160.jpg?' + pi.UUID(), date: new Date,
        }
        
        if ( loop > 1 ) {
            item.children = generate(10, loop-1)
        }
        
        return item;
    });
};

pi.Obj.assign(window.VueData, {
    tableBinds: {
        draggable: true,
    },
    tableReact: {
        items: generate(200, 3)
    }
});
```

## Example

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item label="Draggable" class="col--auto">
                <n-switch v-model="tableBinds.draggable">Activate drag and drop</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <n-table style="height: 500px;" :items="tableReact.items" :render-expand="true" :item-height="80" :use-keys="true" :threshold="51" v-bind="tableBinds" @update:items="(items) => tableReact.items = items">
            <n-table-column label="Label" type="string" prop="label" :fluid="true" :sort="true" :filter="true"></n-table-column>
            <n-table-column label="Image" type="image" prop="image" :fixed-width="90"></n-table-column>
            <n-table-column label="Date" type="datetime" prop="date" :filter="true"></n-table-column>
            <n-table-column label="ID" type="string" prop="id" :sort="true"></n-table-column>
        </n-table>
    </div>
</n-form>
```

### Table

```html
/*vue*/

<template>
    <n-table :items="items" :render-expand="true" :item-height="100">
        <n-table-column label="Label" type="string" prop="label" :fluid="true" :sort="true" :filter="true"></n-table-column>
        <n-table-column label="Image" type="image" prop="image" :fixed-width="90"></n-table-column>
        <n-table-column label="Date" type="datetime" prop="date" :filter="true"></n-table-column>
        <n-table-column label="ID" type="string" prop="id" :sort="true"></n-table-column>
    </n-table>
</template>

<script>
    export default {
        methods: {
            
            generator(count = 200, depth = 1)
            {
                if ( ! depth ) {
                    return [];
                }
                
                if ( ! this.total ) {
                    this.total = 0;
                }
                
                return pi.Arr.each(pi.Arr.make(count), (index) => {
                    return {
                        label: 'Item ' + index,
                        id: 'value-a-' + index,
                        image: 'https://picsum.photos/100/100?' + index,
                        date: new Date,
                        children: this.generator(count, depth - 1)
                    };
                });
            }
            
        },
        data()
        {
            return {
                items: this.generator(10, 1)
            };
        }
    } 
</script>

```

### Table with adaptive height

```html
/*vue*/

<template>
    <div style="height: 300px; display: flex; flex-direction: column;">
        <n-table style="flex: 1 1 auto;" :items="items" :viewport-height="true" :item-height="100">
            <n-table-column label="Label" type="string" prop="label" :fluid="true" :sort="true" :filter="true"></n-table-column>
            <n-table-column label="Image" type="image" prop="image" :fixed-width="90"></n-table-column>
            <n-table-column label="Date" type="datetime" prop="date" :filter="true"></n-table-column>
            <n-table-column label="ID" type="string" prop="id" :sort="true"></n-table-column>
        </n-table>
    </div>
</template>

<script>
    export default {
        methods: {
            
            generator(count = 200, depth = 1)
            {
                if ( ! depth ) {
                    return [];
                }
                
                if ( ! this.total ) {
                    this.total = 0;
                }
                
                return pi.Arr.each(pi.Arr.make(count), () => {
                        
                    this.total++;
   
                    return {
                        label: 'Item ' + this.total,
                        id: 'value-b-' + this.total,
                        image: 'https://picsum.photos/100/100?' + this.total,
                        date: new Date,
                        children: this.generator(count, depth - 1)
                    };
                })
            }
            
        },
        data()
        {
            return {
                items: this.generator(30, 1)
            };
        }
    } 
</script>

```

### Table with fixed height and virtual scrolling

```html
/*vue*/

<template>
    <n-table :items="items" :render-expand="true" :viewport-height="300" :item-height="100" :safe-zone="safeZone">
        <n-table-column label="Label" type="string" prop="label" :fluid="true" :sort="true" :filter="true"></n-table-column>
        <n-table-column label="Image" type="image" prop="image" :fixed-width="90"></n-table-column>
        <n-table-column label="Date" type="datetime" prop="date" :filter="true"></n-table-column>
        <n-table-column label="ID" type="string" prop="id" :sort="true"></n-table-column>
    </n-table>
</template>

<script>
    export default {
        methods: {
            
            safeZone(height)
            {
                return height * 0.20;
            },
            
            generator(count = 200, depth = 1)
            {
                if ( ! depth ) {
                    return [];
                }
                
                if ( ! this.total ) {
                    this.total = 0;
                }
                
                return pi.Arr.each(pi.Arr.make(count), () => {
                        
                    this.total++;
   
                    return {
                        label: 'Item ' + this.total,
                        id: 'value-c-' + this.total,
                        image: 'https://picsum.photos/100/100?' + this.total,
                        date: new Date,
                        children: this.generator(count, depth - 1)
                    };
                })
            }
            
        },
        data()
        {
            return {
                items: this.generator(120, 2)
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