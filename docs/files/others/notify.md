# Notification

The Notification system provides a way to display non-intrusive messages to users. It handles creation, display, and automatic removal of notification toasts with various styles and options.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    //
});
```

```html [demo]
<n-form>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Default Notify</h3>
            </div>
            <div class="col--auto">
                <n-button type="primary" @click="Notification.make('Primary notification', 'primary')">Primary</n-button>
            </div>
            <div class="col--auto">
                <n-button type="secondary" @click="Notification.make('Secondary notification', 'secondary')">Secondary</n-button>
            </div>
            <div class="col--auto">
                <n-button type="success" @click="Notification.make('Success notification', 'success')">Success</n-button>
            </div>
            <div class="col--auto">
                <n-button type="warning" @click="Notification.make('Warning notification', 'warning')">Warning</n-button>
            </div>
            <div class="col--auto">
                <n-button type="danger" @click="Notification.make('Danger notification', 'danger')">Danger</n-button>
            </div>
            <div class="col--auto">
                <n-button type="info" @click="Notification.make('Info notification', 'info')">Info</n-button>
            </div>
        </div>
    </div>
</n-form>
```
<hr>

## Usage

```javascript
Notification.make('Operation successful!', 'success', {
    duration: 5000 // Display for 5 seconds
});

```