import { Arr, Obj, Any } from "nano-js";

export default {

    name: 'NFileList',

    model: {
        prop: 'items'
    },

    props: {

        items: {
            default()
            {
                return [];
            },
            type: [Array]
        },

        useProgress: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        fileProp: {
            default()
            {
                return 'file';
            },
            type: [String]
        },

        uniqueProp: {
            default()
            {
                return 'id';
            },
            type: [String]
        },

        doneProp: {
            default()
            {
                return 'done';
            },
            type: [String]
        },

        errorProp: {
            default()
            {
                return 'error';
            },
            type: [String]
        },

        progressProp: {
            default()
            {
                return 'progress';
            },
            type: [String]
        },

        casts: {
            default()
            {
                return [
                    { match: 'image/*', use: 'NFileListItemImage' }
                ];
            },
            type: [Array]
        },

        defaultCast: {
            default()
            {
                return 'NFileListItem';
            },
            type: [String]
        },

        threshold: {
            default()
            {
                return 20;
            },
            type: [Number]
        }

    },

    provide()
    {
        return {
            NFileList: this
        };
    },

    methods: {

        removeFile(unique)
        {
            if ( Any.isString(unique) ) {
                unique = unique[this.uniqueProp]
            }

            Arr.remove(this.items, {
                [this.uniqueProp]: unique
            });
        }

    },

    renderFile(value)
    {
        let file = Obj.get(value, this.fileProp);

        let component = Arr.find(this.casts, (cast) => {
            return file.type.match(
                new RegExp('^' + cast.match.replace('*', '.*?') + '$')
            );
        });

        let props = { value };

        if ( this.threshold ) {
            props.renderPreview = true;
        }

        return (
            this.$render(component ? component.use : 'NFileListItem', {
                key: value[this.uniqueProp], props: props
            })
        );
    },

    render($render)
    {
        this.$render = $render;

        return (
            <div class="n-file-list__wrapper">
                <NScrollbar class="n-file-list">
                    { Arr.each(this.items, this.ctor('renderFile')) }
                </NScrollbar>
            </div>
        );
    }

}
