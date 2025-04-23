# Modal
Modal you know.

```html
/*vue*/
<template>
    <div>
        <n-button>Open</n-button>
        <n-modal ref="modal">
            <div slot="header">
                <h3>Hi</h3>
            </div>
            <div>
                <p>Im the content</p>
            </div>
            <div slot="footer">
                <n-button @click="$refs.modal.close()">Ok!</n-button>
            </div>
        </n-modal>
    </div>
</template>
<script>
    export default {
    }
</script>
```

### Properties
coming soon

### Events
coming soon
