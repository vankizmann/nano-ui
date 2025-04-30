# Table

The `<n-table>` component is a comprehensive data table solution with features for sorting, filtering, selection, and row expansion. Used together with `<n-table-column>`, it provides a flexible way to display and interact with structured data.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    tableBinds: {
        draggable: true,
        renderSelect: true,
        renderExpand: false,
        renderHandle: false,
        useKeys: true,
        itemHeight: 38,
        disableMove: false,
        uniqueProp: 'id',
        childProp: 'children',
        sortProp: 'id',
        sortDir: 'desc'
    },
    tableData: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', status: 'Active', age: 32 },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'Inactive', age: 28 },
        { id: 3, name: 'Robert Johnson', email: 'robert.johnson@example.com', status: 'Active', age: 45 },
        { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', status: 'Pending', age: 36 },
        { id: 5, name: 'Michael Wilson', email: 'michael.wilson@example.com', status: 'Active', age: 41 }
    ],
    tableSelected: [],
    tableVisible: ['id', 'name', 'email', 'status', 'age'],
    tableFilter: []
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Draggable">
                <n-switch v-model="tableBinds.draggable">Enable dragging</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Select">
                <n-switch v-model="tableBinds.renderSelect">Show checkboxes</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Expand">
                <n-switch v-model="tableBinds.renderExpand">Show expand</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Handle">
                <n-switch v-model="tableBinds.renderHandle">Show handles</n-switch>
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disable Move">
                <n-switch v-model="tableBinds.disableMove">Disable movement</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Basic Table</h3>
            </div>
            <div class="col--1-1">
                <n-table 
                    v-model:items="tableData"
                    v-model:selected="tableSelected"
                    v-model:visible="tableVisible"
                    v-model:sort-prop="tableBinds.sortProp"
                    v-model:sort-dir="tableBinds.sortDir"
                    v-model:filter="tableFilter"
                    v-bind="tableBinds"
                    @row-click="(row) => $root.notify('Row clicked: ' + row.value.name, 'info')"
                >
                    <n-table-column prop="id" label="ID" width="80" sort filter type="number"></n-table-column>
                    <n-table-column prop="name" label="Name" width="200" sort filter></n-table-column>
                    <n-table-column prop="email" label="Email" width="250" sort filter></n-table-column>
                    <n-table-column prop="status" label="Status" width="120" sort filter type="select" 
                        :options="['Active', 'Inactive', 'Pending']"></n-table-column>
                    <n-table-column prop="age" label="Age" width="100" sort filter type="number"></n-table-column>
                </n-table>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">Selected: {{ $root.print(tableSelected) }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Table

| **Prop**             | **Type**          | **Default**     | **Description**                                                           |
|----------------------|-------------------|-----------------|---------------------------------------------------------------------------|
| `items`              | `Array`           | `[]`            | Array of data items to display in the table.                              |
| `draggable`          | `Boolean`         | `true`          | Enables row drag-and-drop functionality.                                  |
| `visible`            | `Array`           | `[]`            | Array of column prop names that should be visible.                        |
| `current`            | `Any`             | `null`          | The currently focused/selected item.                                      |
| `selected`           | `Array`           | `[]`            | Array of selected items.                                                  |
| `expanded`           | `Array`           | `[]`            | Array of expanded items (for hierarchical data).                          |
| `filter`             | `Array`           | `[]`            | Array of active filters.                                                  |
| `sortProp`           | `String`          | `'id'`          | Property name to sort by.                                                 |
| `sortDir`            | `String`          | `'desc'`        | Sort direction ('asc' or 'desc').                                         |
| `closeFilterOnEnter` | `Boolean`         | `false`         | If true, closes filter dropdown when Enter key is pressed.                |
| `group`              | `Array`           | `['default']`   | Group identifier for drag and drop.                                       |
| `allowGroups`        | `Array`           | `['default']`   | Groups that items can be dragged to.                                      |
| `handle`             | `Boolean`         | `false`         | If true, requires dragging by handle.                                     |
| `safezone`           | `Function`        | `(h) => h*0.51` | Function to calculate safe drop zone.                                     |
| `showEmptyIcon`      | `Boolean`         | `true`          | Shows empty icon when no items are present.                               |
| `itemHeight`         | `Number`          | `38`            | Height of each table row in pixels.                                       |
| `itemOffset`         | `Number`          | `30`            | Indentation for hierarchical data.                                        |
| `scrollTopOnChange`  | `Boolean/Function`| `false`         | Scrolls to top when data changes.                                         |
| `uniqueProp`         | `String`          | `'id'`          | Property name that uniquely identifies each item.                         |
| `childProp`          | `String`          | `'children'`    | Property name for child items in hierarchical data.                       |
| `renderSelect`       | `Boolean`         | `true`          | Show selection checkboxes.                                                |
| `renderHandle`       | `Boolean`         | `false`         | Show drag handles.                                                        |
| `renderExpand`       | `Boolean`         | `false`         | Show expand buttons for hierarchical data.                                |
| `renderCurrent`      | `Boolean`         | `true`          | Highlight the current row.                                                |
| `transformDrop`      | `Function`        | `(node) => node`| Transform function for dropped items.                                     |
| `disableMove`        | `Boolean`         | `false`         | If true, disables drag-and-drop functionality.                            |
| `insertNode`         | `Function`        | `() => true`    | Function to determine if a node can be inserted.                          |
| `removeNode`         | `Function`        | `() => true`    | Function to determine if a node can be removed.                           |
| `allowSelect`        | `Function`        | `() => true`    | Function to determine if an item can be selected.                         |
| `allowDrag`          | `Function`        | `() => true`    | Function to determine if an item can be dragged.                          |
| `allowDrop`          | `Function`        | `() => true`    | Function to determine if an item can be dropped.                          |
| `threshold`          | `Number`          | `1`             | Threshold for drag detection.                                             |
| `useKeys`            | `Boolean`         | `false`         | Enables keyboard navigation.                                              |
| `keyEvents`          | `Boolean`         | `true`          | Enables keyboard events.                                                  |
| `highlightTimeout`   | `Number`          | `7000`          | Duration in milliseconds for highlighting after operations.               |

| **Method**                  | **Description**                                                      |
|-----------------------------|----------------------------------------------------------------------|
| `addColumn(column)`         | Adds a column to the table.                                          |
| `removeColumn(column)`      | Removes a column from the table.                                     |
| `getColumnIndex(column)`    | Gets the index of a column.                                          |
| `getColumnVisiblity(column)`| Checks if a column is visible.                                       |
| `getColumnSorted(column)`   | Gets the sort direction of a column.                                 |
| `getColumnFilter(column)`   | Gets the filter for a column.                                        |
| `getColumnFiltered(column)` | Checks if a column is filtered.                                      |
| `detectVisible(column)`     | Detects if a column should be visible.                               |
| `sortByColumn(column)`      | Sorts the table by the specified column.                             |
| `replaceFilter(filter)`     | Replaces a filter.                                                   |
| `resetFilter()`             | Clears all active filters.                                           |
| `selectAll()`               | Selects all visible items.                                           |
| `highlightNode(value, key)` | Highlights a specific node in the table.                             |
| `syncCurrent()`             | Synchronizes the current item.                                       |
| `refreshCurrent()`          | Refreshes the current item view.                                     |

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

## Advanced Features

### Hierarchical Data

The table supports hierarchical data through the `childProp` property. When used with `renderExpand`, it allows for expanding and collapsing nested data structures:

```html
<n-table 
    :items="hierarchicalData"
    child-prop="subItems"
    render-expand
>
    <!-- Table columns -->
</n-table>
```

### Custom Row Rendering

You can customize the rendering of rows by using the `renderBody` slot:

```html
<n-table :items="items">
    <template #renderBody="props">
        <div class="custom-row" :class="{'highlighted': props.value.highlight}">
            {{ props.value.name }}
        </div>
    </template>
</n-table>
```

### Conditional Row Actions

Use the table's functions to conditionally enable actions:

```html
<n-table 
    :items="items"
    :allow-drag="(item) => item.status !== 'locked'"
    :allow-select="(item) => item.selectable"
>
    <!-- Table columns -->
</n-table>
```