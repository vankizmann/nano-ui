# File

The `<n-file>` component is a file input control that combines a button for selecting files with an input display for showing the selected file(s). It supports single and multiple file selection.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    fileBinds: {
        size: 'md', 
        disabled: false,
        clearable: true,
        icon: nano.Icons.fileUpload
    },
    fileValue: {
        single: null,
        multiple: [],
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="fileBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="fileBinds.disabled">Disable file upload</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Multiple">
                <n-switch v-model="fileBinds.multiple">Enable multiple files</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Clearable">
                <n-switch v-model="fileBinds.clearable">Show clear button</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Single File</h3>
            </div>
            <div class="col--1-1">
                <n-file v-model="fileValue.single" v-bind="fileBinds" icon="fa fa-ghost"></n-file>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">
                    {{ $root.print(fileValue.single) }}
                </code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Multiple Files</h3>
            </div>
            <div class="col--1-1">
                <n-file v-model="fileValue.multiple" v-bind="fileBinds" :multiple="true"></n-file>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">
                    {{ $root.print(fileValue.multiple) }}
                </code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## File

| **Prop**          | **Type**       | **Default**      | **Description**                                                                   |
|-------------------|----------------|------------------|-----------------------------------------------------------------------------------|
| `modelValue`      | `File/Array`   | `null`           | The current file(s) selected. For multiple files, it's an array of File objects.  |
| `multiple`        | `Boolean`      | `false`          | If true, allows selecting multiple files.                                         |
| `icon`            | `String`       | `''`             | Icon to display on the selection button.                                          |
| `size`            | `String`       | `'md'`           | Sets the size of the file component (e.g., 'sm', 'md', 'lg').                     |
| `disabled`        | `Boolean`      | `false`          | If true, disables the file component.                                             |
| `placeholder`     | `String`       | `''`             | Placeholder text to display when no file is selected.                             |
| `clearable`       | `Boolean`      | `true`           | If true, shows a button to clear the selected file(s).                            |
| `clearableIcon`   | `String`       | `Icons.times`    | Icon to use for the clear button.                                                 |
| `buttonText`      | `String`       | `'Select file'`  | Text to display on the file selection button.                                     |

| **Method**         | **Description**                                                      |
|--------------------|----------------------------------------------------------------------|
| `openContext()`    | Opens the file selection dialog.                                     |
| `clearFile()`      | Clears the currently selected file(s).                               |

| **Event**           | **Description**                                                      |
|---------------------|----------------------------------------------------------------------|
| `update:modelValue` | Emitted when files are selected or cleared.                          |