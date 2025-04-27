# Radio

The `<n-radio>` component is a customizable radio button component with various options to control its appearance and behavior. It can be used individually or as part of a `<n-radio-group>` for selecting a single value from multiple options.

<hr>

## Example

```js [demo]
pi.Obj.assign(window.VueData, {
    radioBinds: {
        size: 'md', 
        disabled: false, 
        type: 'primary'
    },
    radioValues: {
        group: 'option1'
    }
});
```

```html [demo]
<n-form>
    <div class="demo-options">
        <div class="grid grid--row grid--wrap grid--20-20">
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Size">
                <n-select v-model="radioBinds.size" :options="sizes" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Type">
                <n-select v-model="radioBinds.type" :options="types" />
            </n-form-item>
            <n-form-item class="col--1-1 col--6-12@sm col--3-12@lg" label="Disabled">
                <n-switch v-model="radioBinds.disabled">Activate disable state</n-switch>
            </n-form-item>
        </div>
    </div>
    <div class="demo-display">
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Radio Group</h3>
            </div>
            <div class="col--auto">
                <n-radio-group v-model="radioValues.group" :size="radioBinds.size">
                    <n-radio value="option1" v-bind="radioBinds">Option 1</n-radio>
                    <n-radio value="option2" v-bind="radioBinds">Option 2</n-radio>
                    <n-radio value="option3" v-bind="radioBinds">Option 3</n-radio>
                </n-radio-group>
            </div>
            <div class="col--flex-1-1">
                <code style="white-space: initial">{{ radioValues.group }}</code>
            </div>
        </div>
        <div class="grid grid--row grid--wrap grid--40-40 grid--middle">
            <div class="col--1-1">
                <h3>Vertical Alignment</h3>
            </div>
            <div class="col--auto">
                <n-radio-group v-model="radioValues.group" :size="radioBinds.size" align="vertical">
                    <n-radio value="option1" v-bind="radioBinds">Option 1</n-radio>
                    <n-radio value="option2" v-bind="radioBinds">Option 2</n-radio>
                    <n-radio value="option3" v-bind="radioBinds">Option 3</n-radio>
                </n-radio-group>
            </div>
        </div>
    </div>
</n-form>
```

<hr>

## Radio

| **Prop**     | **Type**            | **Default** | **Description**                                                                                  |
|--------------|---------------------|-------------|--------------------------------------------------------------------------------------------------|
| `value`      | `Any`               | `null`      | The value of the radio button when used within a radio group.                                    |
| `checked`    | `Boolean`           | `false`     | The current state of the radio button.                                                           |
| `disabled`   | `Boolean`           | `false`     | If true, disables the radio button.                                                              |
| `size`       | `String`            | `'md'`      | Sets the size of the radio button (e.g., 'sm', 'md', 'lg').                                      |
| `type`       | `String`            | `'primary'` | Sets the style type of the radio button.                                                         |

| **Name**              | **Description**                             |
|-----------------------|---------------------------------------------|
| `$slots.default`      | Content for the radio button label.         |
| `$slots.label`        | Alternative slot for the radio button label.|

<hr>

## Radio Group

| **Prop**     | **Type** | **Default**  | **Description**                                             |
|--------------|----------|--------------|-------------------------------------------------------------|
| `modelValue` | `Any`    | `null`       | Currently selected value from radio buttons in the group.   |
| `size`       | `String` | `'md'`       | Sets the size of all radio buttons in the group.            |
| `align`      | `String` | `'horizontal'`| Sets the alignment of radio buttons ('horizontal' or 'vertical'). |

| **Name**         | **Description**                             |
|------------------|---------------------------------------------|
| `$slots.default` | Place to put all radio button components.   |