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

        let props = {
            fit: 'contain',
            preview: false,
            showSrc: false,
        }

        return (
            <div>
                <NPreview file={this.input} {...props} />
            </div>
        );
    }

}
