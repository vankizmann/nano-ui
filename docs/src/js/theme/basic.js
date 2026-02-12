import { Mix, Dom, Cookie } from "@kizmann/pico-js";

const theme = Cookie.get('theme', 'dark');

Dom.find(document.body).addClass('n-theme--' + theme);

Dom.find('[data-theme-light]').on('click', () => {
    Cookie.set('theme', 'light'); window.location.reload();
});

Dom.find('[data-theme-dark]').on('click', () => {
    Cookie.set('theme', 'dark'); window.location.reload();
});

Dom.find('[data-theme-src]').each((el) => {
    el.src = Dom.find(el).attr('data-theme-src').replace('{theme}', theme);
});

Dom.find(document.body).live('click', '.matching-post', () => {
    Dom.find('input[type="search"]').value('').fire('input');
});

Dom.find(document.body).on('keydown', (e) => {
    if ( e.keyCode === 27 ) {
        Dom.find('input[type="search"]').value('').fire('input');
    }
});

Dom.find(window).on('scroll', () => {
    if ( ! Dom.find('.sidebar-nav').inviewY(0.1) ) {
        Dom.find(document.body).addClass('sticky-sub-nav');
    } else {
        Dom.find(document.body).remClass('sticky-sub-nav');
    }
});

Dom.find(window).on('resize', () => {

    let left = Dom.find('.sidebar-nav')
        .offsetLeft();

    if ( Mix.isEmpty(left) ) {
        return;
    }

    let width = Dom.find('.sidebar-nav')
        .width();

    if ( Mix.isEmpty(width) ) {
        return;
    }

    Dom.find('.app-sub-sidebar').style({
        left: left + 'px', width: width + 'px'
    });
});

Dom.complete(() => {
    Dom.find(window).fire('resize').fire('scroll');
}, 500);
