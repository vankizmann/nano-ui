import CtorMixin from "../../../mixins/src/ctor";
import { Str, Num, Arr, Locale } from "nano-js";

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
                return 100;
            },
            type: [Number]
        },

        limitOptions: {
            default()
            {
                return [25, 50, 100, 500, 1000, 2500];
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
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'secondary';
            },
            type: [String]
        },

        maxPages: {
            default()
            {
                return 7;
            },
            type: [Number]
        },

        layout: {
            default()
            {
                return [
                    'limit', 'review', 'spacer', 'goto', 'pages'
                ]
            },
            type: [Array]
        }

    },

    computed: {

        pages()
        {
            return Num.ceil(this.total / this.veLimit);
        }

    },

    data()
    {
        return {
            vePage: this.page, veLimit: this.limit
        }
    },

    methods: {

        changePage(page)
        {
            this.vePage = page;
        },

        updatePaginate()
        {
            let paginate = {
                page: this.vePage, limit: this.veLimit
            };

            this.$emit('paginate', paginate);
        },

        eventPageInput(value)
        {
            this.$emit('update:page', this.vePage = value);

            this.updatePaginate();
        },

        eventLimitInput(value)
        {
            this.$emit('update:limit', this.veLimit = value);

            if ( this.pages < this.vePage ) {
                this.$emit('update:page', this.vePage = 1);
            }

            this.updatePaginate();
        },

    },

    watch: {

        page()
        {
            if ( this.page !== this.vePage ) {
                this.vePage = this.page;
            }
        },

        limit()
        {
            if ( this.limit !== this.veLimit ) {
                this.veLimit = this.limit;
            }
        }

    },

    renderLimit()
    {
        let events = {
            input: this.eventLimitInput
        };

        let props = {
            value: this.veLimit,
            size: this.size
        };

        let optionsHtml = Arr.each(this.limitOptions, (limit) => {
            return (
                <NSelectOption disabled={limit === this.veLimit} value={limit}>
                    { this.choice(':count items', limit) }
                </NSelectOption>
            );
        });

        return (
            <div class="n-paginator__limit">
                <NSelect props={props} on={events}>
                    { optionsHtml }
                </NSelect>
            </div>
        );
    },

    renderReview()
    {
        return (
            <div class="n-paginator__review">
                <span>
                    { this.choice('No items|Total :count item|Total :count items', this.total) }
                </span>
            </div>
        );
    },

    renderSpacer()
    {
        return (
            <div class="n-paginator__spacer">
                { /* Nothing :( */ }
            </div>
        );
    },

    renderGoto()
    {
        let events = {
            input: this.eventPageInput
        };

        let props = {
            value: this.vePage,
            size: this.size,
            undefinedText: '?'
        };

        let optionsHtml = Arr.each(Arr.make(this.pages || 1), (value, index) => {
            return (
                <NSelectOption disabled={Num.int(index) + 1 === this.vePage} value={Num.int(index) + 1}>
                    { Num.int(index) + 1 }
                </NSelectOption>
            );
        });

        return (
            <div class="n-paginator__goto">
                <span>
                    {this.trans('Goto')}
                </span>
                <NSelect props={props} on={events}>
                    { optionsHtml }
                </NSelect>
            </div>
        );
    },

    renderPrev()
    {
        let props = {
            type: this.type,
            square: true,
            size: this.size,
            icon: this.icons.angleLeft
        };

        if ( this.vePage - 1 < 1 ) {
            props.disabled = true;
        }

        let events = {
            click: () => this.eventPageInput(this.vePage - 1)
        };

        return (
            <NButton props={props} on={events} />
        );
    },

    renderNext()
    {
        let props = {
            type: this.type,
            square: true,
            size: this.size,
            icon: this.icons.angleRight
        };

        if ( this.vePage + 1 > this.pages ) {
            props.disabled = true;
        }

        let events = {
            click: () => this.eventPageInput(this.vePage + 1)
        };

        return (
            <NButton props={props} on={events} />
        );
    },

    renderPage(index)
    {
        let page = this.vePage;

        let pages = Math.abs(this.maxPages / 2);

        if ( page < pages ) {
            page = pages;
        }

        let global = Array(this.pages).length;

        if ( page > global - pages ) {
            page = global - pages;
        }

        let current = Num.int(index) + 1;

        if ( current < page - pages ) {
            return null;
        }

        if ( current > Math.max(1, page + pages) ) {
            return null;
        }

        let props = {
            type: this.type,
            square: true,
            size: this.size
        };

        if ( current === this.vePage ) {
            props.disabled = true;
        }

        let events = {
            click: () => this.eventPageInput(current)
        };

        return (
            <NButton props={props} on={events}>{ current }</NButton>
        );
    },

    renderPages()
    {
        return (
            <div class="n-paginator__pages">
                { this.ctor('renderPrev')() }
                {
                    Arr.each(Arr.make(this.pages || 1), (empty, index) => {
                        return this.ctor('renderPage')(index);
                    })
                }
                { this.ctor('renderNext')() }
            </div>
        );
    },

    renderSlot(view)
    {
        if ( ! this.$slots[view] ) {
            return null;
        }

        return this.$slots[view];
    },

    render()
    {
        let className = [
            'n-paginator',
            'n-paginator--' + this.size
        ];

        return <div class={className}>
            {
                Arr.each(this.layout, (view) => {

                    let ctor = this.ctor('render' + Str.ucfirst(view));

                    return ctor ? ctor() : this.ctor('renderSlot')(view)
                })
            }
        </div>;
    }
}
