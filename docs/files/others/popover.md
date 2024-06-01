# Popover
Popover you know.

```html
/*vue*/
<template>
    <div class="grid grid--row grid--wrap grid--20-20">
        <n-button class="col--1-1" type="primary">Open on hover</n-button>
        <n-popover trigger="hover" type="tooltip" :window="true">
            Hello im the popover
        </n-popover>
        <n-button class="col--1-1" type="primary">Open on click</n-button>
        <n-popover trigger="click" :window="true">
            Hello im the popover
        </n-popover>
        <div class="col--1-1">
            <div style="background: #eee; width: 100%; height: 500px; line-height: 500px; text-align: center; border-radius: 3px;">
                Open on right click
            </div>
            <n-popover trigger="context" :window="true">
                Hello im the popover
            </n-popover>
        </div>
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
