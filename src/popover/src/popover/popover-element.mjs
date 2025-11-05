import { Any, Dom, Arr, Obj, UUID } from "@kizmann/pico-js";
import { PopoverHelper } from "./popover-helper.mjs";
import PopoverHandler from "./popover-handler.mjs";


export class PopoverElement
{
    static alias = 'Popover';

    visible = false;

    options = {
        parent: null, target: null, listen: false, trigger: 'hover', position: 'bottom-center', width: -1, scrollClose: true, multiClose: true,
    };

    client = {
        x: 0, y: 0
    };

    events = {};

    constructor(el, options = {})
    {
        this.options = Obj.assign(this.options, options, {
            el
        });

        if ( ! options.uid ) {
            options.uid = UUID()
        }

        this.bind();
    }

    bind()
    {
        let { uid, trigger } = this.options;

        if ( trigger === 'hover' ) {
            Dom.find(document.body).on(PopoverHelper.getHoverEvent(),
                Any.framerate((e) => this.onHover(e), 30), { uid });
        }

        if ( trigger === 'click' ) {
            Dom.find(document.body).on(PopoverHelper.getClickEvent(),
                Any.throttle((e) => this.onClick(e), 30), { uid });
        }

        if ( trigger === 'context' ) {
            Dom.find(document.body).on(PopoverHelper.getContextEvent(),
                Any.throttle((e) => this.onContext(e), 30), { uid });
        }
    }

    unbind()
    {
        let { uid, trigger } = this.options;

        if ( trigger === 'hover' ) {
            Dom.find(document).off(PopoverHelper.getHoverEvent(),
                null, { uid });
        }

        if ( trigger === 'click' ) {
            Dom.find(document).off(PopoverHelper.getClickEvent(),
                null, { uid });
        }

        if ( trigger === 'context' ) {
            Dom.find(document).off(PopoverHelper.getContextEvent(),
                null, { uid });
        }
    }

    parents()
    {
        let { parent } = this.options;

        if ( Any.isEmpty(parent) ) {
            return [];
        }

        return Arr.merge(parent.parents(), [
            parent.options.uid
        ]);
    }

    currentChange(parents)
    {
        let { uid, multiClose } = this.options;

        if ( ! multiClose || Arr.has(parents, uid) ) {
            return;
        }

        this.hide('multi')
    }

    on(event, cb)
    {
        this.events[event] = cb;
    }

    off(event)
    {
        delete this.events[event];
    }

    show(event = 'default')
    {
        if ( this.interval ) {
            clearInterval(this.interval);
        }

        this.interval = setTimeout(() => {
            this.showQueue(event);
        }, 100);
    }

    showQueue(event = 'default')
    {
        if ( this.visible ) {
            return this.updatePosition();
        }

        let { el } = this.options;

        Dom.find(el).attr('data-ready', 'true');

        if ( Any.isFunction(this.events['open']) ) {
            this.events['open'].apply({}, [event]);
        }

        requestAnimationFrame(() => {
            this.updatePosition();
        });

        requestAnimationFrame(() => {
            this.bindResizeObserver();
        });

        this.visible = true;

        PopoverHandler.setCurrent(this);
    }

    hide(event = 'default')
    {
        if ( this.interval ) {
            clearInterval(this.interval);
        }

        this.interval = setTimeout(() => {
            this.hideQueue(event);
        }, 50);
    }

    hideQueue(event = 'default')
    {
        let { el } = this.options;

        Dom.find(el).attr('data-ready', null);

        if ( Any.isFunction(this.events['close']) ) {
            this.events['close'].apply({}, [event]);
        }

        this.unbindResizeObserver();

        this.visible = false;

        console.log('hide', event, el);

        PopoverHandler.unsetCurrent(this);
    }

    onHover(event)
    {
        let { el, target } = this.options;

        let tgt = Dom.find(event.target).closest(target),
            src = Dom.find(event.target).closest(el);

        let result = (!! tgt || !! src);

        if ( this.visible === result ) {
            return;
        }

        if ( ! result ) {
            return this.hideQueue('hover');
        }

        this.showQueue('hover');
    }

    onClick(event)
    {
        let { el, target } = this.options;

        let keyCode = event.which === 1 || event.which === 0;

        if ( this.visible || ! keyCode ) {
            return;
        }

        let tgt = Dom.find(event.target).closest(target),
            src = Dom.find(event.target).closest(el);

        let result = (!! tgt || !! src);

        if ( this.visible === result ) {
            return;
        }

        console.log('click vis true', el)

        this.showQueue('click');
    }

    onContext(event)
    {
        let { el, target } = this.options;

        let keyCode = event.which === 3;

        if ( !keyCode ) {
            return;
        }

        let tgt = Dom.find(event.target).closest(target),
            src = Dom.find(event.target).closest(el);

        this.client.x = event.clientX;
        this.client.y = event.clientY;

        let result = (!! tgt || !! src);

        if ( result ) {
            event.preventDefault();
            event.stopPropagation();
        }

        if ( ! result ) {
            return;
        }

        this.showQueue('context');
    }

    bindResizeObserver()
    {
        let { el } = this.options;

        this.observer = new ResizeObserver(() => {
            this.updatePosition();
        });

        this.observer.observe(el);
    }

    unbindResizeObserver()
    {
        if ( this.observer ) {
            this.observer.disconnect();
        }
    }

    updatePosition()
    {
        let { el, target, width } = this.options;

        let [rect, offset, scroll] = [
            target.getBoundingClientRect(), this.getTargetOffset(), Dom.find(document.body).scroll()
        ];

        Dom.find(el).attr('data-position', offset.position);

        if ( ! window.zIndex ) {
            window.zIndex = 9000;
        }

        let style = {
            'z-index':  window.zIndex++,
            'top':      Math.round(offset.y + scroll.top) + 'px',
            'left':     Math.round(offset.x + scroll.left) + 'px',
        };

        if ( width === -1 ) {
            style.width = Math.round(rect.width) + 'px';
        }

        Dom.find(el).css(style);
    }

    getTargetHorizontal(position, fallback = null)
    {
        let { el, target, trigger, width, scrollClose } = this.options;

        let targetRect = target.getBoundingClientRect();

        if ( trigger === 'context' ) {
            targetRect = {
                top: this.client.y, left: this.client.x, width: 2, height: 2
            };
        }

        let windowRect = Dom.find(el).actual(() => {
            return el.getBoundingClientRect();
        });

        if ( width === -1 ) {
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

        let inverse = position;

        if ( position.match(/^(top)\-/) ) {
            inverse = inverse.replace(/^(top)\-/, 'bottom-');
        }

        if ( position.match(/^(bottom)\-/) ) {
            inverse = inverse.replace(/^(bottom)\-/, 'top-');
        }

        let broken = offset.y + windowRect.height >
            window.innerHeight || offset.y < 0;

        if ( scrollClose && broken && ! fallback ) {
            return this.getTargetHorizontal(inverse, offset);
        }

        if ( fallback && broken ) {
            offset = fallback;
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
            offset.x = window.innerWidth - windowRect.width -
                (window.innerWidth - document.body.clientWidth);
        }

        if ( broken ) {
            position = 'auto';
        }

        return Obj.assign(offset, { position });
    }

    getTargetVertical(position, fallback = null)
    {
        let { el, target, trigger, width, scrollClose } = this.options;

        let targetRect = target.getBoundingClientRect();

        if ( trigger === 'context' ) {
            targetRect = {
                top: this.client.y, left: this.client.x, width: 2, height: 2
            };
        }

        let windowRect = Dom.find(el).actual(() => {
            return el.getBoundingClientRect();
        });

        if ( width === -1 ) {
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

        let inverse = position;

        if ( position.match(/^(left)\-/) ) {
            inverse = inverse.replace(/^(left)\-/, 'right-');
        }

        if ( position.match(/^(right)\-/) ) {
            inverse = inverse.replace(/^(right)\-/, 'left-');
        }

        let broken = offset.x + windowRect.width >
            window.innerWidth || offset.x < 0;

        if ( scrollClose && broken && ! fallback ) {
            return this.getTargetVertical(inverse, offset);
        }

        if ( fallback && broken ) {
            offset = fallback;
        }

        if ( offset.y < 0 ) {
            offset.y = 0;
        }

        if ( offset.y + windowRect.height >  window.innerHeight ) {
            offset.y = window.innerHeight - windowRect.height;
        }

        if ( offset.x < 0 ) {
            offset.x = 0;
        }

        if ( offset.x + windowRect.width > window.innerWidth ) {
            offset.x = window.innerWidth - windowRect.width -
                (window.innerWidth - document.body.clientWidth);
        }

        if ( broken ) {
            position = 'auto';
        }

        return Obj.assign(offset, { position });
    }

    getTargetOffset()
    {
        let { position } = this.options;

        if ( position.match(/^(top|bottom)\-/) ) {
            return this.getTargetHorizontal(position);
        }

        if ( position.match(/^(left|right)\-/) ) {
            return this.getTargetVertical(position);
        }

        console.error(`Popover position "${position}" does not exist`);
    }

}

if ( ! window[PopoverElement.alias] ) {
    window[PopoverElement.alias] = PopoverElement;
}

export default PopoverElement;