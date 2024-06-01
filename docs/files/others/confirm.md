# Confirm
Confirm y0.

```html
/*vue*/
<template>
    <div class="grid grid--row grid--wrap grid--20-20">
            <n-button class="col--1-1" type="primary" :plain="true">Primary</n-button>
            <n-confirm type="primary" @abort="abort" @confirm="confirm">
                Confirmtext!
            </n-confirm>
            <n-button class="col--1-1" type="success" :plain="true">Success</n-button>
            <n-confirm type="success" @abort="abort" @confirm="confirm">
                Confirmtext!
            </n-confirm>
            <n-button class="col--1-1" type="warning" :plain="true">Warning</n-button>
            <n-confirm type="warning" @abort="abort" @confirm="confirm">
                Confirmtext!
            </n-confirm>
            <n-button class="col--1-1" type="danger" :plain="true">Danger</n-button>
            <n-confirm type="danger" @abort="abort" @confirm="confirm">
                Confirmtext!
            </n-confirm>
            <n-button class="col--1-1" type="info" :plain="true">Info</n-button>
            <n-confirm type="info" @abort="abort" @confirm="confirm">
                Confirmtext!
            </n-confirm>

    </div>
</template>
<script>
    export default {
        methods: {
            abort()
            {
                window.alert('abort');
            },
            confirm()
            {
                window.alert('confirm');
            }
        }
    }
</script>
```

### Properties
coming soon

### Events
coming soon
