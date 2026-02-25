import { Obj, Arr, Run, Mix, Dom } from "@kizmann/pico-js";

export default {

    name: 'NPreviewImage',

    props: {

        src: {
            default()
            {
                return null;
            }
        },

    },

    data()
    {
        return {
            load: false, tempSrc: null
        };
    },

    beforeMount()
    {
        if ( ! window.ImageCache ) {
            window.ImageCache = [];
        }


        if ( ! Arr.has(window.ImageCache, this.src) ) {
            this.tempSrc = this.src;
        }

    },

    mounted()
    {
        this.resolveLoad();
    },

    watch: {

        'src': function () {
            this.resolveLoad();
        }

    },

    methods: {

        resolveLoad()
        {
            if ( Arr.has(window.ImageCache, this.src) ) {
                return;
            }

            this.tempSrc = null;

            if ( Mix.isRef(this.src) ) {
                return this.resolveData();
            }

            Dom.find(this.$refs.image).loaded(() => {

                /**
                 * Add image to cache
                 */
                Arr.add(window.ImageCache, this.src);

                /**
                 * Mark image as loaded
                 */
                Run.delay(() => this.load = false, 200);
            });

            this.laod = true;
        },

        resolveData()
        {
            let reader = new FileReader();

            reader.onload = () => {
                this.tempSrc = reader.result;
            };

            reader.readAsDataURL(this.src);
        }

    },

    render()
    {
        let classList = [
            'n-preview-image'
        ];

        if ( Arr.has(window.ImageCache, this.src) ) {
            classList.push('n-cached');
        }

        if ( ! this.load ) {
            classList.push('n-ready');
        }

        return (
            <div class={classList}>
                <img ref="image" src={this.tempSrc || this.src} />
            </div>
        );
    }

}