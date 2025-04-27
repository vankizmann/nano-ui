# Modal

The `<n-modal>` component is a dialog box/popup window that displays content on top of the current page. It can be used for notifications, form inputs, or any content that requires user attention.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    modalBinds: {
        size: 'md', 
        width: '640px',
        closable: true,
        renderClose: true,
    },
    modalVisible: false
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Size">
                <n-select v-model="modalBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Closable">
                <n-switch v-model="modalBinds.closable">Close on backdrop or ESC</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="RenderClose">
                <n-switch v-model="modalBinds.renderClose">Render close times</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--auto">
                <n-button type="primary" @click="modalVisible = true">Open Modal</n-button>
                <n-modal 
                    v-model="modalVisible" 
                    v-bind="modalBinds"
                    title="Modal Title"
                >
                    <template #default="{ closeModal }">
                        <p>This is the modal content. You can put any components or HTML here.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod eros vitae dolor rhoncus, vel tincidunt nunc vulputate.</p>
                    </template>
                    <template #footer="{ closeModal }">
                        <div class="grid grid--row grid--right grid--20-20">
                            <div class="col--auto">
                                <n-button type="default" @click="closeModal(false, 'cancel')">Cancel</n-button>
                            </div>
                            <div class="col--auto">
                                <n-button type="primary" @click="closeModal(false, 'confirm')">Confirm</n-button>
                            </div>
                        </div>
                    </template>
                </n-modal>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Modal

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Boolean`      | `false`             | Controls whether the modal is visible.                                            |
| `listen`        | `Boolean`      | `true`              | If true, listens for clicks on the associated element to open the modal.          |
| `update`        | `Boolean`      | `true`              | If true, updates the modelValue when closed.                                      |
| `selector`      | `String`       | `null`              | CSS selector for the element that triggers the modal.                             |
| `disabled`      | `Boolean`      | `false`             | If true, disables the modal.                                                      |
| `width`         | `String`       | `'50%'`             | Width of the modal (CSS value).                                                   |
| `height`        | `String`       | `'auto'`            | Height of the modal (CSS value).                                                  |
| `title`         | `String`       | `''`                | Title text to display in the header (if no header slot).                          |
| `type`          | `String`       | `'default'`         | Style type of the modal.                                                          |
| `size`          | `String`       | `'md'`              | Size of the modal (e.g., 'sm', 'md', 'lg').                                       |
| `position`      | `String`       | `'center-center'`   | Position of the modal on screen.                                                  |
| `closable`      | `Boolean`      | `true`              | If true, the modal can be closed by clicking outside or pressing ESC.             |
| `renderClose`   | `Boolean`      | `true`              | If true, renders a close button in the header.                                    |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when the modal visibility changes, with the new value and source.  |
| `close`               | Emitted when the modal is closed with the source.                    |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content for the modal body. Receives `{ closeModal }` in slot props. |
| `header`              | Content for the modal header. Receives `{ closeModal }` in slot props. |
| `footer`              | Content for the modal footer. Receives `{ closeModal }` in slot props. |
| `body`                | Override slot for the body, bypassing the scrollbar. Receives `{ closeModal }` in slot props. |
| `raw`                 | Raw content, bypassing the entire frame structure.                   |