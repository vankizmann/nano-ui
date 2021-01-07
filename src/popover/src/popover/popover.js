import { Arr, Any, Dom } from "nano-js";


export default {

    name: 'NPopover',

    provide()
    {
        return {
            NPopover: this
        };
    },

    props: {

        modelValue: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        width: {
            default()
            {
                return 0;
            },
            type: [Number]
        },

        disabled: {
            default()
            {
                return false;
            },
            type: [Boolean]
        },

        selector: {
            default()
            {
                return null;
            },
        },

        boundary: {
            default()
            {
                return null;
            },
        },

        window: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        trigger: {
            default()
            {
                return 'hover';
            },
            type: [String]
        },

        type: {
            default()
            {
                return 'default';
            },
            type: [String]
        },

        size: {
            default()
            {
                return 'md';
            },
            type: [String]
        },

        position: {
            default()
            {
                return 'bottom-center';
            },
            type: [String]
        },

        scrollClose: {
            default()
            {
                return true;
            },
            type: [Boolean]
        },

        framerate: {
            default()
            {
                return 30;
            },
            type: [Number]
        }

    },

    watch: {

        modelValue()
        {
            this.tempValue = this.modelValue;
        },

        tempValue()
        {
            this.refreshVisible();
        }

    },

    methods: {

        active()
        {
            return this.tempValue;
        },

        close()
        {
            this.$emit('update:modelValue', 
                this.tempValue = false);
        },

        refreshVisible()
        {
            Dom.find(this.$el).css(null);

            if ( ! this.tempValue ) {
                return clearInterval(this.refresh);
            }

            this.refresh = setInterval(this.updatePosition, 
                1000 / this.framerate);

            delete this.passedOffset;
        },

        isSameOffset(offset)
        {
            if ( ! this.passedOffset ) {
                return false;
            }

            let rainbow = Arr.each(['x', 'y'], (key) => {
                return offset[key] === this.passedOffset[key];
            });

            return ! Arr.has(rainbow, false);
        },

        getTargetHorizontal(position)
        {
            let targetRect = this.target.getBoundingClientRect();

            if ( this.trigger === 'context' ) {
                targetRect = {
                    top: this.clientY, left: this.clientX, width: 2, height: 2
                };
            }

            let windowRect = this.$el.getBoundingClientRect();

            if ( this.width === -1 ) {
                windowRect.width = targetRect.width;
            }

            let posY = {

                // Set above the tagret element
                start: targetRect.top - windowRect.height,
                
                // Set at bottom of target element
                end: targetRect.top + targetRect.height,

            };

            let posX = {

                // Set on the left of target element
                start: targetRect.left,

                // Set into the center of the target element
                center: targetRect.left + (targetRect.width * 0.5) - 
                    (windowRect.width * 0.5),

                // Set on the right of the target element
                end: targetRect.left + targetRect.width - 
                    windowRect.width,

            };

            let offset = { x: 0, y: 0 };

            if ( position === 'top-start' ) {
                offset = { x: posX.start, y: posY.start };
            }

            if ( position === 'top-center' ) {
                offset = { x: posX.center, y: posY.start };
            }

            if ( position === 'top-end' ) {
                offset = { x: posX.end, y: posY.start };
            }

            if ( position === 'bottom-start' ) {
                offset = { x: posX.start, y: posY.end };
            }

            if ( position === 'bottom-center' ) {
                offset = { x: posX.center, y: posY.end };
            }

            if ( position === 'bottom-end' ) {
                offset = { x: posX.end, y: posY.end };
            }

            if ( offset.y < 0 ) {
                offset.y = 0;
            }
        
            if ( offset.y + windowRect.height > window.innerHeight ) {
                offset.y = window.innerHeight - windowRect.height;
            }

            if ( offset.x < 0 ) {
                offset.x = 0;
            }
        
            if ( offset.x + windowRect.width > window.innerWidth ) {
                offset.x = window.innerWidth - windowRect.width;
            }

            return offset;
        },

        getTargetVertical(position)
        {
            let targetRect = this.target.getBoundingClientRect();

            if ( this.trigger === 'context' ) {
                targetRect = {
                    top: this.clientY, left: this.clientX, width: 2, height: 2
                };
            }

            let windowRect = this.$el.getBoundingClientRect();

            if ( this.width === -1 ) {
                windowRect.width = targetRect.width;
            }
            
            let posY = {

                // Set at top edge of the target element
                start: targetRect.top,

                // Set at the middle of the target element
                center: targetRect.top + (targetRect.height * 0.5) - 
                    (windowRect.height * 0.5),

                // Ste at the bottom of the target elemnent
                end: targetRect.top + targetRect.height - 
                    windowRect.height,

            };

            let posX = {

                // Set to the left of the target element
                start: targetRect.left - windowRect.width,

                // Set to the right of the target element
                end: targetRect.left + targetRect.width,

            };

            let offset = { x: 0, y: 0 };

            if ( position === 'left-start' ) {
                offset = { x: posX.start, y: posY.start };
            }

            if ( position === 'left-center' ) {
                offset = { x: posX.start, y: posY.center };
            }

            if ( position === 'left-end' ) {
                offset = { x: posX.start, y: posY.end };
            }

            if ( position === 'right-start' ) {
                offset = { x: posX.end, y: posY.start };
            }

            if ( position === 'right-center' ) {
                offset = { x: posX.end, y: posY.center };
            }

            if ( position === 'right-end' ) {
                offset = { x: posX.end, y: posY.end };
            }

            if ( offset.y < 0 ) {
                offset.y = 0;
            }
        
            if ( offset.y + windowRect.height > window.innerHeight ) {
                offset.y = window.innerHeight - windowRect.height;
            }

            if ( offset.x < 0 ) {
                offset.x = 0;
            }
        
            if ( offset.x + windowRect.width > window.innerWidth ) {
                offset.x = window.innerWidth - windowRect.width;
            }

            return offset;
        },

        getTargetOffset()
        {
            let position = this.position;

            if ( position.match(/^(top|bottom)\-/) ) {
                return this.getTargetHorizontal(position);
            }

            if ( position.match(/^(left|right)\-/) ) {
                return this.getTargetVertical(position);
            }

            return targetRect;
        },

        updatePosition()
        {
            let rect = this.target.getBoundingClientRect();

            if ( this.isSameOffset(rect) ) {
                return;
            }

            let offset = this.getTargetOffset();

            let style = {
                'z-index':  window.zIndex++,
                'top':      Math.round(offset.y) + 'px', 
                'left':     Math.round(offset.x) + 'px', 
            };

            if ( this.width === -1 ) {
                style.width = rect.width + 'px';
            }
            
            Dom.find(this.$el).css(style);

            if ( this.scrollClose && this.passedOffset ) {
                this.close();
            }

            this.passedOffset = rect;
        },

        onHover(event, el)
        {
            if ( this.disabled ) {
                return;
            }

            let target = Dom.find(el).closest(this.target),
                source = Dom.find(el).closest(this.$el);

            let result = (!! target || !! source);

            if ( this.tempValue === result ) {
                return;
            }

            if ( ! result ) {
                return this.$nextTick(this.close);
            }

            this.$emit('update:modelValue', this.tempValue = result);
        },

        onClick(event, el)
        {
            let keyCode = event.which === 1;

            if ( this.disabled || this.tempValue || ! keyCode ) {
                return;
            }

            let target = Dom.find(el).closest(this.target),
                source = Dom.find(el).closest(this.$el);

            let result = (!! target || !! source);

            if ( this.tempValue === result ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            this.$emit('update:modelValue', this.tempValue = result);
        },

        onContext(event, el)
        {
            let keyCode = event.which === 3;

            if ( this.disabled || this.tempValue || ! keyCode ) {
                return;
            }

            let target = Dom.find(el).closest(this.target),
                source = Dom.find(el).closest(this.$el);

            this.clientX = event.clientX;
            this.clientY = event.clientY;

            let result = (!! target || !! source);

            if ( this.tempValue === result ) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            this.$emit('update:modelValue', this.tempValue = result);
        },

        onExit(event, el)
        {
            if ( this.disabled || ! this.tempValue ) {
                return;
            }

            if ( !! Dom.find(el).closest(this.$el) ) {
                return;
            }

            let target = Dom.find(el).closest(this.target);

            if ( this.trigger !== 'context' && !! target ) {
                return;
            }

            this.close();
        }

    },

    data()
    {
        return {
            tempValue: false,
            clientX: 0,
            clientY: 0,
            target: null
        };
    },

    beforeMount()
    {
        this.tempValue = this.visible;
    },

    mounted()
    {
        this.target = Dom.find(this.$el).previous().get(0);

        if ( this.trigger === 'context' ) {
            this.target = Dom.find(this.$el).parent().get(0);
        }

        if ( this.window ) {
            Dom.find(document.body).append(this.$el);
        }

        if ( this.trigger === 'hover' ) {
            Dom.find(document.body).on('mousemove', 
                Any.framerate(this.onHover, 30), this._uid);
        }

        if ( this.trigger === 'click' ) {
            Dom.find(document.body).on('click', 
                Any.framerate(this.onClick, 30), this._uid);
        }

        if ( this.trigger === 'context' ) {
            Dom.find(document.body).on('contextmenu', 
                Any.framerate(this.onContext, 30), this._uid);
        }


        Dom.find(document.body).on('mousedown', 
            Any.framerate(this.onExit, 30), this._uid);
    },

    beforeUnmount()
    {
        Dom.find(document).off('mousemove', null, this._uid);
        Dom.find(document).off('click', null, this._uid);
        Dom.find(document).off('contextmenu', null, this._uid);
        Dom.find(document).off('mousedown', null, this._uid);

        this.$el.remove();
    },

    renderBody()
    {
        if ( this.$slots.raw ) {
            return this.$slots.raw();
        }

        return (
            <div class="n-popover__frame">
                { this.$slots.header &&
                    <div class="n-popover__header">
                        { this.$slots.header() }
                    </div>
                }
                <div class="n-popover__body">
                    { this.$slots.default() }
                </div>
                { this.$slots.footer &&
                    <div class="n-popover__footer">
                        { this.$slots.footer() }
                    </div>
                }
            </div>
        );
    },

    render()
    {
        if ( ! window.zIndex ) {
            window.zIndex = 9000;
        }

        let classList = [
            'n-popover',
            'n-popover--' + this.type,
            'n-popover--' + this.position
        ];

        if ( this.size ) {
            classList.push('n-popover--' + this.size);
        }

        if ( ! this.tempValue ) {
            classList.push('n-hidden');
        }

        return (
            <div class={this.cmer(classList)}>
                { this.tempValue && this.ctor('renderBody')() }
            </div>
        );
    }

}
