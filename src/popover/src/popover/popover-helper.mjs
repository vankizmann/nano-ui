
export class PopoverHelper
{
    static alias = 'PopoverHelper';

    static getTouchState() {
        return !! ('ontouchstart' in window || navigator.msMaxTouchPoints);
    }

    static getHoverEvent()
    {
        if ( this.getTouchState() ) {
            return 'touchstart';
        }

        return 'mousemove';
    }

    static getClickEvent()
    {
        if ( this.getTouchState() ) {
            return 'touchstart';
        }

        return 'mousedown';
    }

    static getContextEvent()
    {
        if ( this.getTouchState() ) {
            return 'contextmenu';
        }

        return 'contextmenu';
    }

    static getMouseDownEvent()
    {
        if ( this.getTouchState() ) {
            return 'touchstart';
        }

        return 'mousedown';
    }

    static getMouseMoveEvent()
    {
        if ( this.getTouchState() ) {
            return 'touchmove';
        }

        return 'mousemove';
    }

    static getMouseUpEvent()
    {
        if ( this.getTouchState() ) {
            return 'touchend';
        }

        return 'mouseup';
    }

}

if ( ! window[PopoverHelper.alias] ) {
    window[PopoverHelper.alias] = PopoverHelper;
}

export default PopoverHelper;