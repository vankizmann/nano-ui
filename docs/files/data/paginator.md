# Paginator
Paginator for a list.

```html
/*vue*/
<template>
    <div>
        <n-paginator :page="page" :limit="limit" :total="total" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                total: 265, page: 1, limit: 25
            };
        }
    }
</script>
```

### Properties
coming soon