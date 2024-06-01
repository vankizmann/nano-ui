# Notification
Notification pop up box.

```html
/*vue*/
<template>
    <div class="grid grid--row grid--wrap grid--20-20">
            <n-button class="col--1-1" type="primary" :plain="true" @click="showPrimary">Primary</n-button>

            <n-button class="col--1-1" type="success" :plain="true" @click="showSuccess">Success</n-button>

            <n-button class="col--1-1" type="warning" :plain="true" @click="showWarning">Warning</n-button>

            <n-button class="col--1-1" type="danger" :plain="true" @click="showDanger">Danger</n-button>

            <n-button class="col--1-1" type="info" :plain="true" @click="showInfo">Info</n-button>

    </div>
</template>
<script>
    export default {
        methods: {
            showPrimary()
            {
                this.Notify('Im a primary message', 'primary');
            },
            showSuccess()
            {
                this.Notify('Im a success message', 'success');
            },
            showWarning()
            {
                this.Notify('Im a warning message', 'warning');
            },
            showDanger()
            {
                this.Notify('Im a danger message', 'danger');
            },
            showInfo()
            {
                this.Notify('Im a info message', 'info');
            }
        }
    }
</script>
```

### Properties
coming soon

### Events
coming soon
