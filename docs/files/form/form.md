# Form
Form you know.

```js [demo]
    pi.Obj.assign(window.VueData, {
        form: {
            size: 'md', icon: null, square: false, link: false, disabled: false,
        },
        sizes: {
            'sm': 'Small', 'md': 'Medium', 'lg': 'Large'
        },
        icons: {
            'fa fa-ghost': 'Ghost', 'fa fa-plus': 'Plus', 'fa fa-minus': 'Minus'
        }
    });
```

```html
/*vue*/
<template>
    <n-form :form="form" :errors="errors">
    <n-form-item label="Value 01" prop="val1">
        <n-input v-model="form.val1"></n-input>
    </n-form-item>
    <n-form-item label="Value 02" prop="val2">
        <n-input v-model="form.val2"></n-input>
    </n-form-item>
    </n-form>
</template>
<script>
    export default {
        data()
        {
            let form = {
                val1: '', val2: ''
            };
            
            let errors = {
                val1: 'Some random error'
            };
            
            return { form: form,  errors: errors }
        }
    }
</script>
```

### Properties
coming soon

### Events
coming soon
