import InfoField from "../info-field";

export default {

    name: 'NInfoFieldImage',

    extends: InfoField,

    render()
    {
        let className = [
            'n-info__field', 'n-info__field--' + this.column.type
        ];

        return <div class={className}>
            <img src={this.value} />
        </div>;
    }

}
