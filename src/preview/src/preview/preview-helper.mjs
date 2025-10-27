import { Any, Arr, Dom, Obj } from "@kizmann/pico-js";

export class PreviewHelper
{
    static alias = 'PreviewHelper';

    static getExt(source, fallback = 'plain')
    {
        let match = source.match(/\.([^.?]+)(\?.*?)?$/);

        if ( ! match ) {
            return fallback;
        }

        if ( Any.isEmpty(match[1]) ) {
            return fallback;
        }

        return match[1];
    }

    static getType(source, fallback = 'text')
    {
        let file = Obj.get(source, 'name', source);

        if ( Any.isEmpty(file) ) {
            return fallback;
        }

        let extension = PreviewHelper.getExt(file);

        if ( PreviewHelper.getYoutubeKey(file) ) {
            return 'video';
        }

        if ( PreviewHelper.getVimeoKey(file) ) {
            return 'video';
        }

        Obj.each(window.PreviewMimes, (exts, key) => {
            if ( Arr.has(exts, extension) ) fallback = key;
        });

        return fallback;
    }

    static getMime(source, fallback = 'text/plain')
    {
        let file = Obj.get(source, 'name', source);

        if ( Any.isEmpty(file) ) {
            return fallback;
        }

        if ( PreviewHelper.getYoutubeKey(source) ) {
            return 'video/youtube';
        }

        if ( PreviewHelper.getVimeoKey(source) ) {
            return 'video/vimeo';
        }

        return PreviewHelper.getType(file) + '/' + PreviewHelper.getExt(file);
    }

    static getVimeoKey(source, fallback = null)
    {
        if ( ! Any.isString(source) ) {
            return fallback;
        }

        let host = source.match(/^https?:\/\/(www\.|player\.)?vimeo\.com/);

        if ( ! host ) {
            return fallback;
        }

        let path = source.match(/(\/[0-9]+)(&|$)/);

        if ( path && path.length === 3 ) {
            return path[0].replace(/(^\/|&$)/, '');
        }

        return fallback;
    }

    static getYoutubeKey(source, fallback)
    {
        if ( ! Any.isString(source) ) {
            return fallback;
        }

        let host = source.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/);

        if ( ! host ) {
            return fallback;
        }

        let id = source.match(/(\?v=.*?)(?=&|$)/);

        if ( id && id.length === 2 ) {
            return id[0].replace(/^\?v=/, '');
        }

        let path = source.match(/(\.be\/.*?)(?=\?|$)/);

        if ( path && path.length === 2 ) {
            return path[0].replace(/^\.be\//, '');
        }

        let frame = source.match(/(\/embed\/)(.*?$)/);

        if ( frame && frame.length === 3 ) {
            return frame[0].replace(/^\/embed\//, '');
        }

        return fallback;
    }

}

if ( ! window[PreviewHelper.alias] ) {
    window[PreviewHelper.alias] = PreviewHelper;
}

export default PreviewHelper;