# Alert

The Alert system provides a way to display important messages to users that require attention. Unlike notifications, alerts take focus and display centrally with a backdrop overlay.

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
                <h3>Default Alert</h3>
            </div>
            <div class="col--auto">
                <n-button type="primary" @click="Alert('Primary alert message', 'primary')">Primary</n-button>
            </div>
            <div class="col--auto">
                <n-button type="secondary" @click="Alert('Secondary alert message', 'secondary')">Secondary</n-button>
            </div>
            <div class="col--auto">
                <n-button type="success" @click="Alert('Success alert message', 'success')">Success</n-button>
            </div>
            <div class="col--auto">
                <n-button type="warning" @click="Alert('Warning alert message', 'warning')">Warning</n-button>
            </div>
            <div class="col--auto">
                <n-button type="danger" @click="Alert('Danger alert message', 'danger')">Danger</n-button>
            </div>
            <div class="col--auto">
                <n-button type="info" @click="Alert('Info alert message', 'info')">Info</n-button>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Usage

```javascript
Alert.handle('Custom alert', 'warning', {
    icon: 'fas fa-exclamation-circle'
});
```
