# Tabs
Tabs you know.

```html
/*vue*/
<template>
    <div>
        <n-tabs>
            <n-tabs-item name="default" label="Start">
                Hi im the starttext
            </n-tabs-item>
            <n-tabs-item name="keep" label="Keep" icon="fa fa-bug" :keep="true">
                <n-input value="I will stay while editing"></n-input>
            </n-tabs-item>
            <n-tabs-item name="forget" label="Forget" icon="fa fa-clock">
                <n-input value="I will reset while editing"></n-input>
            </n-tabs-item>
        </n-tabs>
    </div>
</template>
<script>
    export default {
        //
    }
</script>
```

### Properties
coming soon

### Events
coming soon
