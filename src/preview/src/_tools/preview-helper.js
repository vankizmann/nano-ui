import { Any, Arr, Dom, Obj } from "@kizmann/pico-js";

window.NPreviewMimes = {
    image: [
        'jpg', 'jpeg', 'gif', 'svg', 'png', 'bmp'
    ],
    video: [
        'mp4', 'webm', 'mov'
    ],
    audio: [
        'mp3', 'aac',
    ],
    font: [
        'woff', 'ttf', 'otf'
    ],
    text: [
        'csv', 'txt', 'html'
    ],
    application: [
        'pdf', 'doc', 'xls'
    ]
};

export class NPreviewHelper
{
    static getExtension(source, fallback = 'plain')
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

    static getMime(source, fallback = 'text')
    {
        let file = Obj.get(source, 'name', source);

        if ( Any.isEmpty(file) ) {
            return fallback;
        }

        let extension = NPreviewHelper.getExtension(file);

        if ( NPreviewHelper.getYoutubeKey(file) ) {
            return 'video';
        }

        if ( NPreviewHelper.getVimeoKey(file) ) {
            return 'video';
        }

        Obj.each(window.NPreviewMimes, (exts, key) => {
            if ( Arr.has(exts, extension) ) fallback = key;
        });

        return fallback;
    }

    static getFullMime(source, fallback = 'text/plain')
    {
        let file = Obj.get(source, 'name', source);

        if ( Any.isEmpty(file) ) {
            return fallback;
        }

        if ( NPreviewHelper.getYoutubeKey(source) ) {
            return 'video/youtube';
        }

        if ( NPreviewHelper.getVimeoKey(source) ) {
            return 'video/vimeo';
        }

        return NPreviewHelper.getMime(file) + '/' + NPreviewHelper.getExtension(file);
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

export default { NPreviewHelper }

if ( ! window.NPreviewHelper ) {
    window.NPreviewHelper = NPreviewHelper;
}