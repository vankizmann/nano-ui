# Table

The `<n-table>` component is a comprehensive data table solution with features for sorting, filtering, selection, and row expansion. Used together with `<n-table-column>`, it provides a flexible way to display and interact with structured data.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    tableBinds: {
        filter: [],
        renderHandle: true,
        childProp: 'cities',
        draggable: true,
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item label="Draggable" class="col--auto">
                <n-switch v-model="tableBinds.draggable">Activate drag and drop</n-switch>
            </n-form-item>
            <n-form-item label="DragHandle" class="col--auto">
                <n-switch v-model="tableBinds.renderHandle">Render drag handle</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <n-table style="height: 600px;" v-model:items="demoItems" :render-expand="true" :item-height="80" :use-keys="true" :threshold="101" v-bind="tableBinds">
            <n-table-column label="Name" type="string" prop="name" :fluid="true" :sort="true" :filter="true"></n-table-column>
            <n-table-column label="Population" type="string" prop="population" :fluid="true" :sort="true" :filter="true"></n-table-column>
            <n-table-column label="Size" type="string" prop="size" :fluid="true" :sort="true" :filter="true"></n-table-column>
            <n-table-column label="Image" type="image" prop="flag" :fixed-width="90"></n-table-column>
        </n-table>
    </div>
</n-form>
```

<hr>

## Table

| **Prop**             | **Type**         | **Default**     | **Description**                                                           |
|----------------------|------------------|-----------------|---------------------------------------------------------------------------|
| `items`              | `Array`          | `[]`            | Array of data items to display in the table.                              |
| `draggable`          | `Boolean`        | `true`          | Enables row drag-and-drop functionality.                                  |
| `visible`            | `Array`          | `[]`            | Array of column prop names that should be visible.                        |
| `current`            | `Any`            | `null`          | The currently focused/selected item.                                      |
| `selected`           | `Array`          | `[]`            | Array of selected items.                                                  |
| `expanded`           | `Array`          | `[]`            | Array of expanded items (for hierarchical data).                          |
| `filter`             | `Array`          | `[]`            | Array of active filters.                                                  |
| `sortProp`           | `String`         | `'id'`          | Property name to sort by.                                                 |
| `sortDir`            | `String`         | `'desc'`        | Sort direction ('asc' or 'desc').                                         |
| `renderSelect`       | `Boolean`        | `true`          | Show selection checkboxes.                                                |
| `renderHandle`       | `Boolean`        | `false`         | Show drag handles.                                                        |
| `renderExpand`       | `Boolean`        | `false`         | Show expand buttons for hierarchical data.                                |
| `itemHeight`         | `Number`         | `38`            | Height of each table row in pixels.                                       |
| `uniqueProp`         | `String`         | `'id'`          | Property name that uniquely identifies each item.                         |
| `childProp`          | `String`         | `'children'`    | Property name for child items in hierarchical data.                       |

| **Method**                  | **Description**                                                      |
|-----------------------------|----------------------------------------------------------------------|
| `sortByColumn(column)`      | Sorts the table by the specified column.                             |
| `resetFilter()`             | Clears all active filters.                                           |
| `selectAll()`               | Selects all visible items.                                           |
| `highlightNode(value, key)` | Highlights a specific node in the table.                             |

| **Event**                   | **Description**                                                      |
|-----------------------------|----------------------------------------------------------------------|
| `update:items`              | Emitted when the items array changes.                                |
| `update:selected`           | Emitted when the selection changes.                                  |
| `update:current`            | Emitted when the current item changes.                               |
| `update:expanded`           | Emitted when the expanded items change.                              |
| `update:visible`            | Emitted when the visible columns change.                             |
| `update:sortProp`           | Emitted when the sort property changes.                              |
| `update:sortDir`            | Emitted when the sort direction changes.                             |
| `update:filter`             | Emitted when the filters change.                                     |
| `sort`                      | Emitted when sorting is applied.                                     |
| `filter`                    | Emitted when filtering is applied.                                   |
| `row-click`                 | Emitted when a row is clicked.                                       |
| `row-dblclick`              | Emitted when a row is double-clicked.                                |

<hr>

## Table Column

| **Prop**             | **Type**         | **Default**          | **Description**                                                 |
|----------------------|------------------|----------------------|-----------------------------------------------------------------|
| `prop`               | `String`         | `UUID()`             | Property name from the data item to display in this column.     |
| `label`              | `String`         | `''`                 | Column header text.                                             |
| `tooltip`            | `String`         | `''`                 | Tooltip text for the column header.                             |
| `type`               | `String`         | `'string'`           | Data type of the column ('string', 'number', 'boolean', etc.).  |
| `align`              | `String`         | `'left'`             | Text alignment ('left', 'center', 'right').                     |
| `sort`               | `Boolean`        | `false`              | Enable sorting for this column.                                 |
| `filter`             | `Boolean`        | `false`              | Enable filtering for this column.                               |
| `visible`            | `Boolean`        | `true`               | Whether the column is initially visible.                        |
| `width`              | `Number`         | `0`                  | Column width in pixels (0 for auto).                            |
| `minWidth`           | `Number`         | `120`                | Minimum column width in pixels.                                 |
| `maxWidth`           | `Number`         | `0`                  | Maximum column width in pixels (0 for no limit).                |
| `options`            | `Object`         | `{}`                 | Options for select-type columns.                                |
| `emptyText`          | `String`         | `'-'`                | Text to display when the value is empty.                        |
| `trueText`           | `String`         | `'Yes'`              | Text to display for boolean `true` values.                      |
| `falseText`          | `String`         | `'No'`               | Text to display for boolean `false` values.                     |
| `datetimeFormat`     | `String`         | `'YYYY-MM-DD HH:mm'` | Format for datetime-type columns.                              |
