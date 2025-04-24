import { Dom, Cookie } from "@kizmann/pico-js";

const theme = Cookie.get('theme', 'dark');

Dom.find('[data-theme-' + theme + ']').addClass('active');

Dom.find('[data-theme-light]').on('click', () => {
    Cookie.set('theme', 'light'); window.location.reload();
});

Dom.find('[data-theme-dark]').on('click', () => {
    Cookie.set('theme', 'dark'); window.location.reload();
});

Dom.find('[data-theme-src]').each((el) => {
    el.src = Dom.find(el).attr('data-theme-src').replace('{theme}', theme);
});

Dom.find('[data-theme-href]').each((el) => {
    el.href = Dom.find(el).attr('data-theme-href').replace('{theme}', theme);
});

Dom.find(document.body).live('click', '.matching-post', () => {
    Dom.find('input[type="search"]').value('').fire('input');
});

Dom.find(document.body).on('keydown', (e) => {
    if ( e.keyCode === 27 ) {
        Dom.find('input[type="search"]').value('').fire('input');
    }
});
