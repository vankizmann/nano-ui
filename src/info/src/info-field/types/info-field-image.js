import InfoField from "../info-field";

export default {

    name: 'NInfoFieldImage',

    extends: InfoField,

    render()
    {
        let classList = [
            'n-info__field', 'n-info__field--' + this.column.type
        ];

        return (
            <div class={classList}>
                <div style={'background-image: url(\'' + this.value + '\');'} />
            </div>
        );
    }

}
