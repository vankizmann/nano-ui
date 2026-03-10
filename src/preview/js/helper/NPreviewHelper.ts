import { Arr, Mix, Obj, Run } from "@kizmann/pico-js";

export const NPreviewMimes : any = {
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
    static ext(source : any, fallback : string = 'plain') : string
    {
        let file = Obj.get(source, 'name', source);

        if ( Mix.isEmpty(file) ) {
            return fallback;
        }

        let match = file.match(/\.([^.?]+)(\?.*?)?$/);

        if ( !match ) {
            return fallback;
        }

        if ( Mix.isEmpty(match[1]) ) {
            return fallback;
        }

        return match[1];
    }

    static type(source : any, fallback = 'text') : string
    {
        let file = Obj.get(source, 'name', source);

        if ( Mix.isEmpty(file) ) {
            return fallback;
        }

        let extension = this.ext(file);

        if ( this.youtube(file) ) {
            return 'video';
        }

        if ( this.vimeo(file) ) {
            return 'video';
        }

        Obj.each(NPreviewMimes, (exts : string[], key : string) => {
            if ( Arr.has(exts, extension) ) fallback = key;
        });

        return fallback;
    }

    static mime(source : any, fallback = 'text/plain') : string
    {
        let file = Obj.get(source, 'name', source);

        if ( Mix.isEmpty(file) ) {
            return fallback;
        }

        if ( this.youtube(file) ) {
            return 'video/youtube';
        }

        if ( this.vimeo(file) ) {
            return 'video/vimeo';
        }

        return this.type(file) + '/' + this.ext(file);
    }

    static vimeo(source : any, fallback : any = null) : any
    {
        if ( !Mix.isStr(source) ) {
            return fallback;
        }

        let host = source.match(/^https?:\/\/(www\.|player\.)?vimeo\.com/);

        if ( !host ) {
            return fallback;
        }

        let path = source.match(/(\/[0-9]+)(&|$)/);

        if ( path && path.length === 3 ) {
            return path[0].replace(/(^\/|&$)/, '');
        }

        return fallback;
    }

    static youtube(source : any, fallback : any = null) : any
    {
        if ( !Mix.isStr(source) ) {
            return fallback;
        }

        let host = source.match(/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)/);

        if ( !host ) {
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

    static image(source : any, cb : Function)
    {
        if ( Mix.isStr(source) ) {
            return Run.frame(() => cb(source));
        }

        let reader = new FileReader();

        reader.onload = () => {
            cb(reader.result);
        };

        reader.readAsDataURL(source);
    }

}