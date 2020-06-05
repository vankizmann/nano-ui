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
**items**  
default: []  
types: Array  
_All items which will be transfer, needs to hold Objects_

**use**  
default: null  
types: String  
_Component which will be rendered instead of default scoped slot (Transfer)_

**useBefore**  
default: null  
types: String  
_Component which will be rendered instead of before scoped slot (Non transfer)_

**useAfter**  
default: null  
types: String  
_Component which will be rendered instead of after scoped slot (Non transfer)_

**selected**  
default: null  
types: Array  
_Array with all selected items can be passed with this prop aswell_

**depth**  
default: 0  
types: Number  
_Current level of depth (used in tree)_

**group**  
default: ['default']  
types: Array  
_Transfer group_

**safezone**  
default: ['default']  
types: Number, Function  
_Safezone for before and after_

```javascript
/* height: 40px; before: 0-10px; inner: 10-30px; after: 30-40px */
(height) => height * 0.25;
```

**showEmpty**  
default: true  
types: Boolean  
_Render empty field_

**itemHeight**  
default: 34  
types: Number  
_Used for render list (loads 25 items in chunks to improve browser reactivity)_

**uniqueProp**  
default: 'id'  
types: String  
_Unique prop for selected list_

**childProp**  
default: null  
types: String  
_Children property for tree_

**transformDrop**  
default: (item) => item  
types: Function  
_Transform property on drop_

**insertNode**  
default: true  
types: Boolean, Function  
_Determines if node will be added to list or just emits move_

**removeNode**  
default: true  
types: Boolean, Function  
_Determines if node will be removed from list or just emits move_

**allowSelect**  
default: (item, depth) => true  
types: Boolean, Function  
_Determines if node is selectable_

**allowDrag**  
default: (item, depth) => true  
types: Boolean, Function  
_Determines if node is transfer_

**allowDrop**  
default: (item, target, move, depth) => true  
types: Boolean, Function  
_Determines if node is droppable_

**className**  
default: ['n-transfer']  
types: Array  
_CSS classes for transfer list_

### Events
```javascript
    /* Emits on data change */
    NTransfer.$on('input', (input) => {
        console.log(input);
    });
    
    /* Emits on move change */
    NTransfer.$on('input', (source, target, move) => {
        console.log(source, target, move);
    });
    
    /* Emits on selected change */
    NTransfer.$on('update:selected', (selected) => {
        console.log(selected);
    });
```