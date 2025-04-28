# Loader

The `<n-loader>` component provides a loading state wrapper for content. It handles visibility timing with minimum display duration and debounce to prevent flickering for quick operations.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    loaderBinds: {
        size: 'md', 
        type: 'primary',
        debounce: 200
    },
    loaderVisible: false
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Size">
                <n-select v-model="loaderBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Type">
                <n-select v-model="loaderBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Debounce (ms)">
                <n-input-number v-model="loaderBinds.debounce" :min="0" :max="1000" :step-size="50" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Default loader</h3>
            </div>
            <div class="col--1-1">
                <n-button-group>
                    <n-button type="primary" @click="loaderVisible = true">
                        Show Loader
                    </n-button>
                    <n-button type="default" @click="loaderVisible = false">
                        Hide Loader
                    </n-button>
                </n-button-group>
            </div>
            <div class="col--1-1">
                <n-loader :visible="loaderVisible" v-bind="loaderBinds" class="loader-display">
                    <p>This content is wrapped by the loader. When the loader is active, this content will be overlaid with a loading indicator.<br>The loader will remain visible for at least the minimum duration, even if the loading state is completed earlier.</p>
                </n-loader>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Loader

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `visible`       | `Boolean`      | `false`             | Controls whether the loader is visible.                                           |
| `size`          | `String`       | `'md'`              | Size of the loader (e.g., 'sm', 'md', 'lg').                                      |
| `type`          | `String`       | `'primary'`         | Style type of the loader.                                                         |
| `minimum`       | `Number`       | `120`               | Minimum display time in milliseconds.                                             |
| `debounce`      | `Number`       | `120`               | Delay before hiding the loader after `visible` becomes false.                     |

| **Slot**         | **Description**                                                      |
|------------------|----------------------------------------------------------------------|
| `$slots.default` | Content to be wrapped by the loader.                                 |