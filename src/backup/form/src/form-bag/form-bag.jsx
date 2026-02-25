import { Mix, Arr, Obj, Hash } from "@kizmann/pico-js";

export default {

    name: 'NFormBag',

    inject: {

        NForm: {
            default: undefined
        }

    },

    data()
    {
        return {
            uid: Hash.uuid()
        };
    },


    methods: {

        gotoField(field)
        {
            //
        }

    },


    renderField(field)
    {
        let errors = Obj.get(this.NForm.getErrors(),
            field.prop, []);

        console.log('err', field.prop, errors)

        if ( Mix.isEmpty(errors) ) {
            return null;
        }

        let items = Arr.each(errors, (error) => {
            return (<li>{error}</li>);
        });

        let itemProps = {
            //
        };

        itemProps['onClick'] = () => {
            console.log('click');
            field.gotoInput();
        };

        return (
            <div class="n-form-bag-item" {...itemProps}>
                <div class="n-form-bag-item__label">
                    <i class="n-icon fa fa-location-crosshairs"></i> <span>{field.label}</span>
                </div>
                <div class="n-form-bag-item__errors">
                    <ul>{items}</ul>
                </div>
            </div>
        )
    },

    render()
    {
        if ( !this.NForm ) {
            return null;
        }

        let classList = [
            'n-form-bag',
            'n-form-bag--' + this.NForm.size,
        ];

        let items = Arr.each(this.NForm.elements, (field) => {
            return this.ctor('renderField')(field);
        });

        return (
            <div class={classList}>
                {items}
            </div>
        );
    }
}
