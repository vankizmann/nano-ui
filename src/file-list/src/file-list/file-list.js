import { Arr, Obj } from "nano-js";

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
                return '$value.file';
            }
        },

        uniqueProp: {
            default()
            {
                return '$value.id';
            }
        },

        doneProp: {
            default()
            {
                return '$value.done';
            }
        },

        errorProp: {
            default()
            {
                return '$value.error';
            }
        },

        progressProp: {
            default()
            {
                return '$value.progress';
            }
        },

        casts: {
            default()
            {
                return [
                    { match: 'image/*', use: 'NFileListItemImage' }
                ];
            },
            type: [Array]
        }

    },

    provide()
    {
        return {
            NFileList: this
        };
    },

    render()
    {
        let renderNode = (h, value, index) => {

            let file = Obj.get({ $value: value }, this.fileProp);

            let component = Arr.find(this.casts, (cast) => {
                return file.type.match(new RegExp('^' +
                    cast.match.replace('*', '.*?') + '$'));
            });

            let props = {
                value: value
            };

            let events = {
                remove: () => {
                    Arr.removeIndex(this.items, index)
                }
            };

            let key = Obj.get({ $value: value }, this.uniqueProp);

            return (
                <div class="n-file-list__item">
                    { h(component ? component.use : 'NFileListItem', { key: key, props: props, on: events }) }
                </div>
            );
        };

        return <NRenderList class="n-file-list" items={this.items} renderNode={renderNode} />;
    }

}
