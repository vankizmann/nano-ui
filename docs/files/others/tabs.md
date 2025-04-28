# Tabs

The `<n-tabs>` component and its child `<n-tabs-item>` components provide a tabbed interface for organizing content into separate views that share the same space.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    tabsBinds: {
        size: 'md', 
        type: 'primary',
        float: false
    },
    activeTab: 'tab1'
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="tabsBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="tabsBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Float">
                <n-switch v-model="tabsBinds.float">Float tabs</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>Basic Tabs</h3>
            </div>
            <div class="col--1-1">
                <n-tabs 
                    v-model="activeTab" 
                    v-bind="tabsBinds"
                >
                    <n-tabs-item name="tab1" label="First Tab" icon="fas fa-home">
                        <div style="padding: 20px;">
                            <strong>First Tab Content</strong>
                            <p>This is the content for the first tab.</p>
                        </div>
                    </n-tabs-item>
                    <n-tabs-item name="tab2" label="Second Tab" icon="fas fa-user">
                        <div style="padding: 20px;">
                            <strong>Second Tab Content</strong>
                            <p>This is the content for the second tab.</p>
                        </div>
                    </n-tabs-item>
                    <n-tabs-item name="tab3" label="Third Tab" icon="fas fa-cog">
                        <div style="padding: 20px;">
                            <strong>Third Tab Content</strong>
                            <p>This is the content for the third tab.</p>
                        </div>
                    </n-tabs-item>
                </n-tabs>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">Active Tab: {{ activeTab }}</code>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Tabs

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `modelValue`    | `String`       | `'default'`         | Name of the currently active tab.                                                 |
| `relative`      | `Boolean`      | `true`              | If true, uses relative positioning for the tab content.                           |
| `size`          | `String`       | `'md'`              | Size of the tabs (e.g., 'sm', 'md', 'lg').                                        |
| `type`          | `String`       | `'primary'`         | Style type of the tabs.                                                           |
| `float`         | `Boolean`      | `false`             | If true, tabs float with a transparent background.                                |

| **Method**              | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `getTab(updateEvent)`   | Gets the current tab and updates the model if needed.                |
| `changeTab(value)`      | Changes the active tab.                                              |

| **Event**               | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `update:modelValue`     | Emitted when the active tab changes.                                 |

<hr>

## Tabs Item

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `label`         | `String`       | `''`                | Text label for the tab.                                                           |
| `name`          | `String`       | `'default'`         | Unique identifier for the tab.                                                    |
| `icon`          | `String`       | `''`                | Icon class for the tab.                                                           |
| `sort`          | `Number`       | `0`                 | Sort order of the tab.                                                            |
| `relative`      | `Boolean`      | `false`             | If true, overrides the parent tabs' relative setting.                             |
| `preload`       | `Boolean`      | `false`             | If true, the tab content is preloaded even when not active.                       |
| `keep`          | `Boolean`      | `false`             | If true, keeps the tab content in the DOM when switching to another tab.          |

| **Method**              | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `changeTab()`           | Activates this tab.                                                  |

| **Slot**                | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `default`               | Content for the tab panel.                                           |
| `label`                 | Custom content for the tab label.                                    |
| `icon`                  | Custom content for the tab icon.                                     |
| `raw`                   | Raw content that bypasses the default wrapper.                       |