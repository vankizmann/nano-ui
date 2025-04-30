# Scrollbar

The `<n-scrollbar>` component provides custom scrollbars with enhanced features like automatic size detection, programmatic scrolling, and customizable appearance. It works on both desktop and touch devices.

<hr>

## Example

```html [demo]
<n-form>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>With JS scrollbars</h3>
            </div>
            <div class="col--1-1">
                <n-scrollbar :allow-native="false" class="scrollbar-display" style="width: 100%; height: 400px;">
                    <div style="width: 1200px; height: 1200px;">
                        <strong>Scrollable Content</strong>
                        <p>This content can be scrolled vertically and horizontally.</p>
                    </div>
                </n-scrollbar>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40">
            <div class="col--1-1">
                <h3>With native scrollbars if not permanent</h3>
            </div>
            <div class="col--1-1">
                <n-scrollbar :allow-native="true" class="scrollbar-display" style="width: 100%; height: 400px;">
                    <div style="width: 1200px; height: 1200px;">
                        <strong>Scrollable Content</strong>
                        <p>This content can be scrolled vertically and horizontally.</p>
                    </div>
                </n-scrollbar>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Programmatic Scrolling

The scrollbar component provides methods for programmatic scrolling:

```javascript
// Get reference to the scrollbar
const scrollbar = this.$refs.scrollbar;

// Scroll to specific coordinates
scrollbar.scrollTo(0, 200);  // Scroll to top: 200px

// Scroll with delay (in milliseconds)
scrollbar.scrollTo(0, 200, 300); // Scroll after 300ms delay

// Scroll to make an element visible
scrollbar.scrollIntoView('.my-element');

// Scroll to element with delay
scrollbar.scrollIntoView('.my-element', 300);
```

<hr>

## Scrollbar

| **Prop**        | **Type**       | **Default**         | **Description**                                                                   |
|-----------------|----------------|---------------------|-----------------------------------------------------------------------------------|
| `options`       | `Object`       | `{}`                | Additional options for the scrollbar component.                                    |
| `relative`      | `Boolean`      | `false`             | If true, uses relative positioning for inner content.                             |
| `fixture`       | `Boolean`      | `false`             | If true, allows fixed sizing of content.                                          |
| `allowNative`   | `Boolean`      | `true`              | If true, allows fallback to native scrollbars when needed.                        |
| `overflowY`     | `Boolean`      | `true`              | If true, enables vertical scrolling.                                              |
| `overflowX`     | `Boolean`      | `true`              | If true, enables horizontal scrolling.                                            |
| `offsetY`       | `Number`       | `10`                | Vertical offset for the scrollbar.                                                |
| `offsetX`       | `Number`       | `10`                | Horizontal offset for the scrollbar.                                              |
| `framerate`     | `Number`       | `24`                | Framerate for scrollbar position updates.                                         |
| `wrapClass`     | `String`       | `'n-scrollbar__wrap'` | CSS class for the scrollbar wrapper element.                                     |

| **Method**                  | **Description**                                                      |
|-----------------------------|----------------------------------------------------------------------|
| `scrollTo(x, y, delay)`     | Scrolls to the specified coordinates with optional delay.            |
| `scrollIntoView(selector, delay)` | Scrolls to make an element visible in the viewport with optional delay. |
| `adaptScrollHeight()`       | Adapts scrollbar height to content.                                  |
| `adaptScrollWidth()`        | Adapts scrollbar width to content.                                   |
| `adaptScrollPosition()`     | Updates scrollbar position based on current scroll.                  |
| `onResize()`                | Handler for resize events.                                           |
| `onUpdate()`                | Updates content dimensions and scrollbars.                           |

| **Event**               | **Description**                                                      |
|-------------------------|----------------------------------------------------------------------|
| `scrollupdate`          | Emitted when the scroll position changes, with top and left values.  |
| `sizechange`            | Emitted when the size of the scrollable area changes.                |
