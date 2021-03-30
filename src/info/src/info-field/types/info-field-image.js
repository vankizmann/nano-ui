import InfoField from "../info-field";

export default {

    name: 'NInfoFieldImage',

    extends: InfoField,

    render()
    {
        if ( this.column.cslo('default', this) ) {
            return (
                <div>{ this.column.$slots.default(this) }</div>
            );
        }

        return (
            <div>
                <NPreview file={this.input} preview={false} />
            </div>
        );
    }

}
