(function($){
    var L10N = function(){};

    L10N.prototype.setLang = function (lang) {
        if(lang && typeof(lang) === 'string' && lang.match(/^[a-zA-Z]{2}\-[a-zA-Z]{2}$/)) {
            $('html').attr('lang', lang.toUpperCase());
            window.i18n = window.l10n[lang] || {};
            window.I18N && window.I18N.translateAll();
        }
    };

    if(!window.l10n){
        window.l10n = {};
    }
    window.L10N = new L10N();
})(jQuery);