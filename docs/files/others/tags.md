# Tags

The `<n-tags>` component and its child `<n-tags-item>` components provide a way to display tag elements with custom styles, colors, and icons.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    tagsBinds: {
        size: 'md',
    },
    tagsList: [
        { label: 'JavaScript', color: 'warning', icon: 'fab fa-js' },
        { label: 'Python', color: 'primary', icon: 'fab fa-python' },
        { label: 'HTML', color: 'danger', icon: 'fab fa-html5' },
        { label: 'CSS', color: 'info', icon: 'fab fa-css3-alt' },
        { label: 'Vue.js', color: 'success', icon: 'fab fa-vuejs' }
    ]
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="tagsBinds.size" :options="sizes" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Basic Tags</h3>
            </div>
            <div class="col--1-1">
                <n-tags v-bind="tagsBinds">
                    <n-tags-item v-for="tag in tagsList" :key="tag.label" :label="tag.label" :icon="tag.icon" :color="tag.color"></n-tags-item>
                </n-tags>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Numeric color tags</h3>
            </div>
            <div class="col--1-1">
                <n-tags v-bind="tagsBinds">
                    <n-tags-item v-for="color in Arr.make(20)" :color="color-1">
                        Basic Tag {{color-1}}
                    </n-tags-item>
                </n-tags>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Tags

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Array`        | `[]`                | Array of selected tags (when using with selection).                               |
| `tags`          | `Array`        | `[]`                | Array of tag data objects.                                                        |
| `size`          | `String`       | `'md'`              | Size of the tags (e.g., 'sm', 'md', 'lg').                                        |
| `type`          | `String`       | `'primary'`         | Style type of the tags container.                                                 |

| **Method**              | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `addTag(tag)`           | Adds a tag to the component.                                         |
| `removeTag(tag)`        | Removes a tag from the component.                                    |

<hr>

## Tags Item

| **Prop**        | **Type**            | **Default**         | **Description**                                                         |
|-----------------|---------------------|---------------------|-------------------------------------------------------------------------|
| `label`         | `String`            | `''`                | Text label for the tag.                                                 |
| `icon`          | `String`            | `''`                | Icon class for the tag.                                                 |
| `type`          | `String/Number`     | `-1`                | Type of the tag (color scheme).                                         |
| `color`         | `String/Number`     | `0`                 | Color variant of the tag 'primary' or '0' - '19'. Used when type is -1. |
| `size`          | `String`            | `'md'`              | Size of the tag (overrides parent's size if specified).                 |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content for the tag (overrides the label prop).                      |