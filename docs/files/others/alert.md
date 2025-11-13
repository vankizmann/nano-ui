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
                <n-button type="primary" @click="Alert.make('Primary alert message', 'primary')">Primary</n-button>
            </div>
            <div class="col--auto">
                <n-button type="secondary" @click="Alert.make('Secondary alert message', 'secondary')">Secondary</n-button>
            </div>
            <div class="col--auto">
                <n-button type="success" @click="Alert.make('Success alert message', 'success')">Success</n-button>
            </div>
            <div class="col--auto">
                <n-button type="warning" @click="Alert.make('Warning alert message', 'warning')">Warning</n-button>
            </div>
            <div class="col--auto">
                <n-button type="danger" @click="Alert.make('Danger alert message', 'danger')">Danger</n-button>
            </div>
            <div class="col--auto">
                <n-button type="info" @click="Alert.make('Info alert message', 'info')">Info</n-button>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Usage

```javascript
Alert.make('Custom alert', 'warning', {
    icon: 'fas fa-exclamation-circle'
});
```
