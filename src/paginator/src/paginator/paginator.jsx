import { Str, Num, Arr, Any } from "@kizmann/pico-js";

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
                return 'md';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'primary';
            },
            type: [String]
        },

        maxPages: {
            default()
            {
                return 5;
            },
            type: [Number]
        },

        layout: {
            default()
            {
                return [
                    'limit', 'count', 'spacer', 'goto', 'pages'
                ]
            },
            type: [Array]
        }

    },

    computed: {

        pages()
        {
            return Num.ceil(this.total / this.tempLimit);
        },

        pageOptions()
        {
            return Arr.make(this.pages || 1);
        }

    },

    data()
    {
        return {
            tempPage: this.page, tempLimit: this.limit,
        };
    },


    methods: {

        forcePage(page)
        {
            if ( page !== this.tempPage ) {
                this.tempPage = page;
            }
        },

        updatePaginate()
        {
            let paginate = {
                page: this.tempPage, limit: this.tempLimit
            };

            this.$emit('paginate', paginate);
        },

        onPrevPage()
        {
            this.onPageInput(this.tempPage - 1);
        },

        onNextPage()
        {
            this.onPageInput(this.tempPage + 1);
        },

        onFirstPage()
        {
            this.onPageInput(1);
        },

        onLastPage()
        {
            this.onPageInput(this.pages);
        },

        onPageInput(value)
        {
            this.$emit('update:page', this.tempPage = value);

            this.updatePaginate();
        },

        onLimitInput(value)
        {
            if ( this.tempLimit !== value ) {
                this.$emit('update:page', this.tempPage = 1);
            }

            this.$emit('update:limit', this.tempLimit = value);

            this.updatePaginate();
        },

    },

    watch: {

        page(value)
        {
            if ( value !== this.tempPage ) {
                this.tempPage = value;
            }
        },

        limit(value)
        {
            if ( value !== this.tempLimit ) {
                this.tempLimit = value;
            }
        }

    },

    renderLimit()
    {
        let props = {
            modelValue: this.tempLimit,
            size: this.size,
            type: this.type,
            optionsValue: '$value.value',
            optionsLabel: '$value.label',
        };

        props.options = Arr.each(this.limitOptions, (limit) => {
            return {
                value: limit, label: this.choice(':count items', limit)
            };
        });

        props['onUpdate:modelValue'] = this.onLimitInput;

        return (
            <div class="n-paginator__limit">
                <NSelect {...props} />
            </div>
        );
    },

    renderCount()
    {
        return (
            <div class="n-paginator__count">
                {this.choice('No items|Total :count item|Total :count items', this.total)}
            </div>
        );
    },

    renderSpacer()
    {
        return (
            <div class="n-paginator__spacer">
                { /* Nothing :( */}
            </div>
        );
    },

    renderGoto()
    {
        if ( this.pageOptions.length > 500 ) {
            // return null;
        }

        let props = {
            modelValue: this.tempPage,
            size: this.size,
            type: this.type,
            undefinedText: '?',
            lazy: true,
            options: this.pageOptions,
            optionsValue: '$value',
            optionsLabel: '$value',
        };

        props['onUpdate:modelValue'] = this.onPageInput;

        return (
            <div class="n-paginator__goto" key={'paginate' + this.pageOptions.length}>
                <NSelect {...props} />
            </div>
        );
    },

    renderPrev()
    {
        let props = {
            type: this.type,
            square: true,
            size: this.size,
            icon: nano.Icons.angleLeft,
            onClick: this.onPrevPage
        };

        if ( this.tempPage - 1 < 1 ) {
            props.disabled = true;
        }

        return (
            <NButton {...props} />
        );
    },

    renderNext()
    {
        let props = {
            type: this.type,
            square: true,
            size: this.size,
            icon: nano.Icons.angleRight,
            onClick: this.onNextPage
        };

        if ( this.tempPage + 1 > this.pages ) {
            props.disabled = true;
        }

        return (
            <NButton {...props} />
        );
    },

    renderFirst()
    {
        if ( this.pages < this.maxPages ) {
            return null;
        }

        let props = {
            type: this.type,
            square: true,
            size: this.size,
            icon: nano.Icons.angleDoubleLeft,
            onClick: this.onFirstPage
        };

        if ( this.tempPage - 1 < 1 ) {
            props.disabled = true;
        }

        return (
            <NButton {...props} />
        );
    },

    renderLast()
    {
        if ( this.pages < this.maxPages ) {
            return null;
        }

        let props = {
            type: this.type,
            square: true,
            size: this.size,
            icon: nano.Icons.angleDoubleRight,
            onClick: this.onLastPage
        };

        if ( this.tempPage + 1 > this.pages ) {
            props.disabled = true;
        }

        return (
            <NButton {...props} />
        );
    },

    renderPage(index)
    {
        let page = this.tempPage;

        let pages = Math.abs(this.maxPages / 2);

        if ( page < pages ) {
            page = pages;
        }

        let global = Array(this.pages).length;

        if ( page > global - pages ) {
            page = global - pages;
        }

        let current = Num.int(index);

        if ( current < page - pages ) {
            return null;
        }

        if ( current > Math.max(1, page + pages) ) {
            return null;
        }

        let props = {
            type: this.type,
            size: this.size,
        };

        if ( current === this.tempPage ) {
            props.disabled = true;
        }

        props.onClick = () => {
            this.onPageInput(current);
        };

        return (
            <NButton {...props}>{current}</NButton>
        );
    },

    renderPages()
    {
        let pages = Arr.each(this.pageOptions, (index) => {
            return this.ctor('renderPage')(index);
        });

        return (
            <div class="n-paginator__pages">
                {this.ctor('renderFirst')()}
                {this.ctor('renderPrev')()}
                {...pages}
                {this.ctor('renderNext')()}
                {this.ctor('renderLast')()}
            </div>
        );
    },

    renderSlot(view)
    {
        let renderFunction = this.ctor('render' +
            Str.ucfirst(view));

        if ( Any.isFunction(renderFunction) ) {
            return renderFunction();
        }

        return this.$slots[view] && this.$slots[view]();
    },

    render()
    {
        let className = [
            'n-paginator',
            'n-paginator--' + this.size,
            'n-paginator--' + this.type
        ];

        return <div class={className}>
            {
                Arr.each(this.layout, (view) => {
                    return this.ctor('renderSlot')(view);
                })
            }
        </div>;
    }
}
