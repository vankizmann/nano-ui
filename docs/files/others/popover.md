# Popover

The `<n-popover>` component family provides customizable popup containers that can be triggered by various events. It includes the main popover component and supporting components for structured content.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    popoverBinds: {
        size: 'md', 
        trigger: 'click',
        disabled: false
    },
    popoverVisible: false
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="popoverBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Trigger">
                <n-select v-model="popoverBinds.trigger" :options="triggers" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="popoverBinds.disabled">Disable popover</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Popover</h3>
            </div>
            <div class="col--auto">
                <n-button type="primary">
                    Click me
                </n-button>
                <n-popover
                    v-model="popoverVisible"
                    v-bind="popoverBinds"
                >
                    <template #default>
                        This is a basic popover content with some text.
                    </template>
                    <template #footer>
                        <n-button size="sm" type="primary" @click="popoverVisible = false">Close</n-button>
                    </template>
                </n-popover>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Popover with Options</h3>
            </div>
            <div class="col--auto">
                <n-button type="primary">
                    Select option
                </n-button>
                <n-popover
                    v-bind="popoverBinds"
                    width="200"
                >
                    <n-popover-option icon="fas fa-user">User Profile</n-popover-option>
                    <n-popover-option icon="fas fa-cog">Settings</n-popover-option>
                    <n-popover-option icon="fas fa-bell">Notifications</n-popover-option>
                    <n-popover-group>Group Title</n-popover-group>
                    <n-popover-option icon="fas fa-sign-out-alt" type="danger">Logout</n-popover-option>
                </n-popover>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Popover

| **Prop**        | **Type**       | **Default**           | **Description**                                                                   |
|-----------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Boolean`      | `null`                 | Controls whether the popover is visible.                                          |
| `width`         | `Number`       | `0`                    | Width of the popover (0 for auto, -1 for same as target).                        |
| `disabled`      | `Boolean`      | `false`                | If true, disables the popover.                                                    |
| `listen`        | `Boolean`      | `true`                 | If true, listens for trigger events.                                              |
| `window`        | `Boolean`      | `true`                 | If true, renders the popover in the document body.                                |
| `trigger`       | `String`       | `'hover'`              | Event that triggers the popover ('hover', 'click', 'context').                   |
| `type`          | `String`       | `'default'`            | Style type of the popover (e.g., 'default', 'tooltip').                          |
| `size`          | `String`       | `'md'`                 | Size of the popover (e.g., 'sm', 'md', 'lg').                                    |
| `position`      | `String`       | `'bottom-center'`      | Position of the popover relative to the target.                                  |
| `scrollClose`   | `Boolean`      | `true`                 | If true, closes the popover when the page scrolls.                               |
| `multiClose`    | `Boolean`      | `true`                 | If true, closes when another popover opens.                                      |
| `framerate`     | `Number`       | `15`                   | Frame rate for position updates.                                                 |

| **Method**            | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `active()`            | Returns whether the popover is active/visible.                       |
| `open()`              | Opens the popover.                                                   |
| `close()`             | Closes the popover.                                                  |
| `pause()`             | Temporarily prevents the popover from closing.                       |
| `unpause()`           | Allows the popover to close again.                                   |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `update:modelValue`   | Emitted when the popover visibility changes.                         |
| `close`               | Emitted when the popover closes.                                     |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content for the popover body.                                        |
| `header`              | Content for the popover header.                                      |
| `footer`              | Content for the popover footer.                                      |
| `raw`                 | Raw content (bypasses the standard frame structure).                 |

<hr>

## Popover Group

| **Prop**      | **Type**       | **Default**           | **Description**                                                                   |
|---------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `size`        | `String`       | `'md'`                 | Size of the popover group (inherits from parent popover if nested).              |

<hr>

## Popover Option

| **Prop**        | **Type**       | **Default**           | **Description**                                                                   |
|-----------------|----------------|------------------------|-----------------------------------------------------------------------------------|
| `type`          | `String`       | `'primary'`            | Style type of the option.                                                        |
| `size`          | `String`       | `'md'`                 | Size of the option (inherits from parent popover if nested).                     |
| `focus`         | `Boolean`      | `false`                | If true, applies focus styling to the option.                                    |
| `active`        | `Boolean`      | `false`                | If true, applies active styling to the option.                                   |
| `disabled`      | `Boolean`      | `false`                | If true, disables the option.                                                    |
| `icon`          | `String`       | `''`                   | Icon class to display with the option.                                           |
| `iconPosition`  | `String`       | `'after'`              | Position of the icon ('before' or 'after').                                     |
| `image`         | `String`       | `''`                   | Image URL to display with the option.                                            |
| `imagePosition` | `String`       | `'before'`             | Position of the image ('before' or 'after').                                    |
| `clickClose`    | `Boolean`      | `true`                 | If true, closes the popover when the option is clicked.                          |

| **Event**             | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `fakeclick`           | Emitted when the option is clicked.                                  |

| **Slot**              | **Description**                                                      |
|-----------------------|----------------------------------------------------------------------|
| `default`             | Content for the option text.                                         |
| `raw`                 | Raw content (bypasses the standard option structure).                |