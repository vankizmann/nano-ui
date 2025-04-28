# Rating

The `<n-rating>` component displays a star-based rating system that can be used to show ratings or allow users to select a rating value.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    ratingBinds: {
        size: 'md', 
        type: 'primary',
        choice: ':count Stars'
    },
    ratingValue: 3.5
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="ratingBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="ratingBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="ratingBinds.disabled">Disable rating</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Rating</h3>
            </div>
            <div class="col--auto">
                <n-rating 
                    v-model="ratingValue" 
                    v-bind="ratingBinds"
                ></n-rating>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(ratingValue) }}</code>
            </div>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Custom Rating Display</h3>
            </div>
            <div class="col--auto">
                <n-rating 
                    v-model="ratingValue" 
                    v-bind="ratingBinds"
                >
                    <template #default="{value}">
                        <strong>{{value}}</strong> out of 5
                    </template>
                </n-rating>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Rating

| **Prop**        | **Type**       | **Default** | **Description**                                                                   |
|-----------------|----------------|-------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Number`       | `0`         | The current rating value.                                                         |
| `steps`         | `Number`       | `0.5`       | The increment step value for ratings.                                             |
| `fixed`         | `Number`       | `1`         | Number of decimal places to display.                                              |
| `max`           | `Number`       | `5`         | Maximum rating value.                                                             |
| `size`          | `String`       | `'md'`      | Size of the rating component (e.g., 'sm', 'md', 'lg').                           |
| `choice`        | `String`       | `':count'`  | Format for displaying the rating value, with `:count` as the placeholder.         |
| `type`          | `String`       | `'primary'` | Style type of the rating component.                                               |
| `disabled`      | `Boolean`      | `false`     | If true, disables the rating component.                                           |

| **Computed**         | **Description**                                                      |
|----------------------|----------------------------------------------------------------------|
| `virtualValue`       | Normalized value scaled to a 5-star system for internal rendering.   |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Custom content for the rating value display. Receives `{value}` in the slot props. |