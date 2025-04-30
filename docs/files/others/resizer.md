# Resizer

The `<n-resizer>` component provides a way to create resizable containers with draggable handles. It can be used to build adjustable layouts, panels, or custom UI elements.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    resizerBinds: {
        minWidth: 100,
        maxWidth: 500,
        resizerWidth: 6
    },
    panelLeftWidth: 200,
    panelRightWidth: 200
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Min Width">
                <n-input-number v-model="resizerBinds.minWidth" :step-size="10" :min="60" :max="200" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Max Width">
                <n-input-number v-model="resizerBinds.maxWidth" :step-size="10" :min="200" :max="600" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Basic Left Resizer</h3>
            </div>
            <div class="col--1-1">
                <div class="grid grid--row resizer-display resizer-display--right" style="height: 300px;">
                    <n-resizer v-model="panelRightWidth" v-bind="resizerBinds" position="right" class="col--flex-0-0">
                        <strong>Resizable Panel</strong>
                        <p>Drag the handle to resize this panel.</p>
                        <p>Current width: {{ panelRightWidth }}px</p>
                    </n-resizer>
                    <div class="col--flex-1-1">
                        <strong>Main Content</strong>
                        <p>This area will adapt to the size of the resizable panel.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Basic Right Resizer</h3>
            </div>
            <div class="col--1-1">
                <div class="grid grid--row resizer-display resizer-display--left" style="height: 300px;">
                    <div class="col--flex-1-1">
                        <strong>Main Content</strong>
                        <p>This area will adapt to the size of the resizable panel.</p>
                    </div>
                    <n-resizer v-model="panelLeftWidth" v-bind="resizerBinds" position="left" class="col--flex-0-0">
                        <strong>Resizable Panel</strong>
                        <p>Drag the handle to resize this panel.</p>
                        <p>Current width: {{ panelLeftWidth }}px</p>
                    </n-resizer>
                </div>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Group Synchronization

When multiple Resizer components share the same group identifier, they will be synchronized when resizing occurs. This ensures that all related components maintain their relative positions and sizes.

To use this feature:

```html
<div class="d-flex">
  <n-resizer :group="['sidebar']">Panel 1</n-resizer>
  <n-resizer :group="['sidebar']">Panel 2</n-resizer>
  <div>Main Content</div>
</div>
```

<hr>

## Resizer

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Number`       | `0`                 | Current width of the resizable element in pixels.                                  |
| `width`         | `Number`       | `0`                 | Initial width of the resizable element in pixels.                                  |
| `minWidth`      | `Number`       | `60`                | Minimum width the element can be resized to.                                       |
| `maxWidth`      | `Number`       | `0`                 | Maximum width the element can be resized to (0 means no limit).                    |
| `group`         | `Array`        | `[]`                | Group identifier for synchronized resizing of multiple elements.                   |
| `disabled`      | `Boolean`      | `false`             | If true, disables resizing functionality.                                          |
| `position`      | `String`       | `'right'`           | Position of the resize handle ('left' or 'right').                                 |
| `resizerWidth`  | `Number`       | `6`                 | Width of the resize handle in pixels.                                              |

| **Method**                   | **Description**                                                      |
|------------------------------|----------------------------------------------------------------------|
| `forceWidth(group)`          | Forces the element to a specific width if it belongs to the given group. |
| `updateWidth()`              | Updates the width based on the current element size.                  |
| `updateHandle()`             | Updates the handle position based on the current width.               |

| **Event**               | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `update:modelValue`     | Emitted when the width changes, with the new width value in pixels.  |
