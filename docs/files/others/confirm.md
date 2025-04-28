# Confirm

The `<n-confirm>` component is a specialized modal dialog that prompts the user for a decision. It provides confirm and abort actions with customizable text and styling.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    confirmBinds: {
        size: 'md', 
        type: 'primary',
        closable: true,
    },
    confirmVisible: false
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Size">
                <n-select v-model="confirmBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Type">
                <n-select v-model="confirmBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Closable">
                <n-switch v-model="confirmBinds.closable">Close on backdrop or ESC</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--auto">
                <n-button type="danger" @click="confirmVisible = true">Delete Item</n-button>
                <n-confirm 
                    v-model:visible="confirmVisible" 
                    v-bind="confirmBinds"
                    @confirm="Alert('Item deleted!', 'success')"
                    @abort="Notify('Operation cancelled.', 'warning')"
                >
                    Are you sure you want to delete this item?<br>
                    This action cannot be undone.
                </n-confirm>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Confirm

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `visible`       | `Boolean`      | `false`             | Controls whether the confirm dialog is visible.                                   |
| `listen`        | `Boolean`      | `true`              | If true, listens for clicks on the associated element to open the dialog.         |
| `update`        | `Boolean`      | `true`              | If true, updates the visible prop when closed.                                    |
| `selector`      | `String`       | `null`              | CSS selector for the element that triggers the dialog.                            |
| `size`          | `String`       | `'md'`              | Size of the confirm dialog (e.g., 'sm', 'md', 'lg').                             |
| `type`          | `String`       | `'primary'`         | Style type of the confirm dialog, also affects icon.                              |
| `width`         | `String`       | `'auto'`            | Width of the dialog (CSS value).                                                  |
| `position`      | `String`       | `'center-center'`   | Position of the dialog on screen.                                                 |
| `closable`      | `Boolean`      | `true`              | If true, the dialog can be closed by clicking outside or pressing ESC.            |
| `confirmText`   | `String`       | `'Confirm'`         | Text for the confirm button.                                                      |
| `abortText`     | `String`       | `'Abort'`           | Text for the abort button.                                                        |
| `buttonSize`    | `String`       | `'md'`              | Size of the buttons (e.g., 'sm', 'md', 'lg').                                     |

| **Method**            | **Description**                                                                               |
|-----------------------|-----------------------------------------------------------------------------------------------|
| `abort()`             | Triggers the abort action and closes the dialog.                                              |
| `confirm()`           | Triggers the confirm action and closes the dialog.                                            |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:visible`      | Emitted when the dialog visibility changes.                          |
| `confirm`             | Emitted when the confirm button is clicked.                          |
| `abort`               | Emitted when the abort button is clicked or dialog is dismissed.     |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content for the confirm message.                                     |