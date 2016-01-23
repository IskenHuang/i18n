(function($){
    var I18N = function(){};

    I18N.prototype.lng = I18N.prototype.lang = function () {
        return $('html').attr('lang').toUpperCase() || 'EN-US';
    };

    I18N.prototype.setLang = function (lang) {
        if(lang && typeof(lang) === 'string' && lang.match(/^[a-zA-Z]{2}\-[a-zA-Z]{2}$/)) {
            $('html').attr('lang', lang.toUpperCase());
            window.I18N.translateAll();
        }
    };

    I18N.prototype.t = I18N.prototype.translate = function (key) {
        if(!key) {
            return this;
        }

        // catch __attrKey__i18nKey
        var _regex = new RegExp('^\\_\\_\\S*\\_\\_', 'i'),
            domKey = key.match(_regex),
            i18nKey = '';

        i18nKey = (domKey) ? key.replace( _regex, '') : key;

        var $dom = $('[data-i18n='+ key +']');

        if(i18nKey in window.i18n){
            var str = window.i18n[i18nKey];

            if(domKey){
                domKey = domKey[0].substr(2, domKey[0].length-4);
                $dom.attr(domKey, str);
            }else{
                $dom.text(str);
            }

        }else{
            if(domKey){
                domKey = domKey[0].substr(2, domKey[0].length-4);
                $dom.attr(domKey, i18nKey);
            }else{
                $dom.text(key);
            }
        }

        return this;
    };

    I18N.prototype.translateAll = function (el) {
        var _this = this,
            $el = $(el),
            $i18n = $el ? $el.find('[data-i18n]') : $('[data-i18n]');

        $i18n.each(function(index){
            var $dom = $($i18n[index]),
                _key = $dom.attr('data-i18n');
            _this.t(_key);
        });

        return this;
    };

    window.i18n = window.i18n || {};
    window.I18N = new I18N().translateAll();
})(jQuery);