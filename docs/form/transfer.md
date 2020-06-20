# Transfer
Drag and drop list or tree.

```html
/*vue*/
<template>
    <div>
        <n-transfer v-model="value" :items="items" label-prop="title"></n-transfer>
    </div>
</template>
<script>
    export default {
        data() {
            
            let items = Nano.Arr.make(40).map((index) => {
                return { id: Nano.UUID(), title: 'foo-' + index };
            });
            
            return {
                items: items, value: items.slice(0, 10)
            }
        }
    }
</script>
```

### Properties


### Events
