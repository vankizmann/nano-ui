# Textarea

The `<n-textarea>` component is a customizable textarea input that allows for multi-line text entry. It features automatic row adjustment, maximum length control, and standard styling options.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    textareaBinds: {
        size: 'md', 
        type: 'primary',
        disabled: false,
        autoRows: true,
        minRows: 4,
        maxRows: 12,
        maxLength: 0
    },
    textareaValue: ''
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="textareaBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="textareaBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="textareaBinds.disabled">Disable textarea</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Auto Rows">
                <n-switch v-model="textareaBinds.autoRows">Enable auto rows</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Min Rows">
                <n-input v-model="textareaBinds.minRows" type="number" min="1" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Max Rows">
                <n-input v-model="textareaBinds.maxRows" type="number" min="1" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Max Length">
                <n-input v-model="textareaBinds.maxLength" type="number" min="0" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Basic Textarea</h3>
            </div>
            <div class="col--1-1">
                <n-textarea 
                    v-model="textareaValue" 
                    v-bind="textareaBinds"
                    placeholder="Enter your text here..."
                ></n-textarea>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ $root.print(textareaValue) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Textarea

| **Prop**      | **Type**       | **Default** | **Description**                                                                   |
|---------------|----------------|-------------|-----------------------------------------------------------------------------------|
| `modelValue`  | `Any`          | `null`      | The current value of the textarea.                                                |
| `type`        | `String`       | `'primary'` | Sets the style type of the textarea.                                              |
| `size`        | `String`       | `'md'`      | Sets the size of the textarea (e.g., 'sm', 'md', 'lg').                           |
| `disabled`    | `Boolean`      | `false`     | If true, disables the textarea.                                                   |
| `placeholder` | `String`       | `''`        | Placeholder text to display when the textarea is empty.                            |
| `autoRows`    | `Boolean`      | `false`     | If true, automatically adjusts the number of rows based on content.               |
| `maxRows`     | `Number`       | `12`        | Maximum number of rows when using autoRows.                                       |
| `minRows`     | `Number`       | `4`         | Minimum number of rows when using autoRows.                                       |
| `maxLength`   | `Number`       | `0`         | Maximum number of characters allowed (0 means no limit).                          |

| **Event**           | **Description**                                                      |
|---------------------|----------------------------------------------------------------------|
| `update:modelValue` | Emitted when the input value changes.                                |