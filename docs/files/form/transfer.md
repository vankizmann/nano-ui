# Transfer

The `<n-transfer>` component is a customizable dual-panel transfer component that allows users to move items between source and target lists. It supports searching, selection, and drag-and-drop functionality.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    transferBinds: {
        size: 'md', 
        type: 'primary'
    },
    transferValue: [],
    transferOptions: [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
        { id: 4, label: 'Option 4' },
        { id: 5, label: 'Option 5' },
        { id: 6, label: 'Option 6' },
        { id: 7, label: 'Option 7' },
        { id: 8, label: 'Option 8' }
    ]
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="transferBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="transferBinds.type" :options="types" />
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <n-transfer v-model="transferValue" v-bind="transferBinds" :options="transferOptions" label-prop="label" unique-prop="id"
                />
            </div>
            <div class="col--1-1">
                <code style="white-space: initial">{{ JSON.stringify(transferValue, null, 4) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Transfer

| **Prop**        | **Type**       | **Default** | **Description**                                                                   |
|-----------------|----------------|-------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `Array`        | `[]`        | Array of selected items (items in the target panel).                              |
| `size`          | `String`       | `'md'`      | Sets the size of the transfer component (e.g., 'sm', 'md', 'lg').                 |
| `type`          | `String`       | `'primary'` | Sets the style type of the transfer component.                                    |
| `options`       | `Array`        | `[]`        | Array of all available items to display in the source and target panels.          |
| `sourceLabel`   | `String`       | `'Source'`  | Label text for the source panel.                                                  |
| `targetLabel`   | `String`       | `'Target'`  | Label text for the target panel.                                                  |
| `labelProp`     | `String`       | `'label'`   | Property name for the item's display text.                                        |
| `uniqueProp`    | `String`       | `'id'`      | Property name for the item's unique identifier.                                   |

| **Method**            | **Description**                                                       |
|-----------------------|-----------------------------------------------------------------------|
| `moveToTarget()`      | Moves all selected source items to the target panel.                  |
| `moveToSource()`      | Moves all selected target items to the source panel.                  |

| **Name**         | **Description**                                                      |
|------------------|----------------------------------------------------------------------|
| `$slots.default` | Custom template for rendering individual items in both panels.       |