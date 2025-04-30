# Drawer

The `<n-drawer>` component is a sliding panel that appears from the edge of the screen. It is commonly used for navigation menus, additional settings, or contextual information without disrupting the main content flow.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    drawerPosition: {
        'left': 'Left',
        'right': 'Right'
    },
    drawerBinds: {
        size: 'md',
        type: 'default',
        width: '30%',
        position: 'right',
        closable: true,
        renderClose: true
    },
    drawerVisible: false
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Size">
                <n-select v-model="drawerBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Position">
                <n-select v-model="drawerBinds.position" :options="drawerPosition" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Closable">
                <n-switch v-model="drawerBinds.closable">Close on backdrop or ESC</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--4-12@lg" label="Render Close">
                <n-switch v-model="drawerBinds.renderClose">Render close times</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--auto">
                <n-button type="primary" @click="drawerVisible = true">Open Drawer</n-button>
                <n-drawer v-model="drawerVisible" v-bind="drawerBinds" title="Drawer Title">
                    <template #default="{ closeDrawer }">
                        <h3>Information</h3>
                        <p style="margin-bottom: 20px;">This is the modal content. You can put any components or HTML here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod eros vitae dolor rhoncus, vel tincidunt nunc vulputate.</p>
                        <n-button type="default" @click="closeDrawer()">Close drawer in content</n-button>
                    </template>
                    <template #footer="{ closeDrawer }">
                        <div class="grid grid--row grid--right grid--20-20">
                            <div class="col--auto">
                                <n-button type="primary" @click="closeDrawer()">Done</n-button>
                            </div>
                        </div>
                    </template>
                </n-drawer>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Drawer

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Boolean`      | `false`             | Controls whether the drawer is visible.                                           |
| `listen`        | `Boolean`      | `true`              | If true, listens for clicks on the associated element to open the drawer.         |
| `update`        | `Boolean`      | `true`              | If true, updates the modelValue when closed.                                      |
| `selector`      | `String`       | `null`              | CSS selector for the element that triggers the drawer.                            |
| `disabled`      | `Boolean`      | `false`             | If true, disables the drawer.                                                     |
| `width`         | `String`       | `'30%'`             | Width of the drawer (CSS value).                                                  |
| `title`         | `String`       | `''`                | Title text to display in the header (if no header slot).                          |
| `type`          | `String`       | `'default'`         | Style type of the drawer.                                                         |
| `size`          | `String`       | `'md'`              | Size of the drawer (e.g., 'sm', 'md', 'lg').                                      |
| `position`      | `String`       | `'right'`           | Position from which the drawer appears ('left', 'right', 'top', 'bottom').        |
| `closable`      | `Boolean`      | `true`              | If true, the drawer can be closed by clicking outside or pressing ESC.            |
| `renderClose`   | `Boolean`      | `true`              | If true, renders a close button in the header.                                    |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when the drawer visibility changes, with the new value and source.  |
| `close`               | Emitted when the drawer is closed with the source.                   |

| **Slot**              | **Description**                                                                            |
|-----------------------|--------------------------------------------------------------------------------------------|
| `default`             | Content for the drawer body. Receives `{ closeDrawer }` in slot props.                         |
| `header`              | Content for the drawer header. Receives `{ closeDrawer }` in slot props.                       |
| `footer`              | Content for the drawer footer. Receives `{ closeDrawer }` in slot props.                       |
| `body`                | Override slot for the body, bypassing the scrollbar. Receives `{ closeDrawer }` in slot props. |
| `raw`                 | Raw content, bypassing the entire frame structure.                                         |