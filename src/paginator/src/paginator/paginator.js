import CtorMixin from "../../../mixins/src/ctor";
import { Num, Arr, Locale } from "nano-js";

export default {

    name: 'NPaginator',

    props: {

        page: {
            default()
            {
                return 1;
            },
            type: [Number]
        },

        limit: {
            default()
            {
                return 50;
            },
            type: [Number]
        },

        limitOptions: {
            default()
            {
                return [25, 50, 100, 250, 500];
            },
        },

        total: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        size: {
            default()
            {
                return 'default';
            }
        },

        maxPages: {
            default()
            {
                return 7;
            },
            type: [Number]
        }

    },

    computed: {

        pages()
        {
            return Num.ceil(this.total / this.nativeLimit);
        }

    },

    methods: {

        ...CtorMixin,

        changePage(page)
        {
            this.nativePage = page;
        },

        updatePaginate()
        {
            let paginate = {
                page: this.nativePage, limit: this.nativeLimit
            };

            this.$emit('paginate', paginate);
        }

    },

    data()
    {
        return {
            nativePage: this.page, nativeLimit: this.limit
        }
    },

    mounted()
    {
        this.$watch('nativePage', (value) => {
            this.$emit('update:page', value);
            this.updatePaginate();
        });

        this.$watch('nativeLimit', (value) => {
            this.$emit('update:limit', value);
            this.updatePaginate();
        });
    },

    render()
    {
        let className = [
            'n-paginator', 'n-paginator--' + this.size
        ];

        let limitOptions = Arr.each(this.limitOptions, (limit) => {
            return (
                <NSelectOption value={limit}>
                    { this.choice(':count items', limit) }
                </NSelectOption>
            );
        });

        return <div class={className}>
            <div class="n-paginator__limit">
                <NSelect vModel={this.nativeLimit} size={this.size} position="top-center">
                    { limitOptions }
                </NSelect>
            </div>
            <div class="n-paginator__review">
                <span>
                    { this.choice('No items|Total :count item|Total :count items', this.total) }
                </span>
            </div>
            <div class="n-paginator__spacer">
                <span></span>
            </div>
            <div class="n-paginator__goto">
                <span>
                    { this.trans('Goto') }
                </span>
                <NSelect vModel={this.nativePage} size={this.size} position="top-center" undefinedText="1">
                    {
                        Arr.each(Array(this.pages).fill(null), (empty, index) => {
                            return (
                                <NSelectOption value={Num.int(index) + 1}>
                                    { Num.int(index) + 1 }
                                </NSelectOption>
                            );
                        })
                    }
                </NSelect>
            </div>
            <div class="n-paginator__pages">
                {
                    Arr.each(Array(this.pages).fill(null), (empty, index) => {

                        let page = this.page,
                            global = Array(this.pages).length,
                            pages = this.maxPages / 2;

                        if ( page < pages ) {
                            page = pages;
                        }

                        if ( page > global - pages ) {
                            page = global - pages;
                        }

                        if ( Num.int(index) + 1 < page - pages ) {
                            return null;
                        }

                        if ( Num.int(index) + 1 > page + pages ) {
                            return null;
                        }

                        let disabled = false;

                        if ( Num.int(index) + 1 === this.nativePage ) {
                            disabled = true;
                        }

                        let changePage = () => {
                            this.changePage(Num.int(index) + 1);
                        };

                        return (
                            <NButton disabled={disabled} outline={true} square={true} size={this.size} vOn:click={changePage}>
                                { Num.int(index) + 1 }
                            </NButton>
                        );
                    })
                }
            </div>
        </div>;
    }
}
