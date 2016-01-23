(function(){
    var I18N = function(){};

    I18N.prototype.lng = I18N.prototype.lang = function () {
        var lang = document.querySelector('html').getAttribute('lang');
        return (lang) ? lang.toUpperCase() : 'EN-US';
    };

    I18N.prototype.setLang = function (lang) {
        if(lang && typeof(lang) === 'string' && lang.match(/^[a-zA-Z]{2}\-[a-zA-Z]{2}$/)) {
            document.querySelector('html').setAttribute('lang', lang.toUpperCase());
            window.I18N.translateAll();
        }
    };

    I18N.prototype.t = I18N.prototype.translate = function translate(key) {
        if(!key) {
            return this;
        }

        // catch __attrKey__i18nKey
        var _regex = new RegExp('^\\_\\_\\S*\\_\\_', 'i'),
            domKey = key.match(_regex),
            i18nKey = '';

        i18nKey = (domKey) ? key.replace( _regex, '') : key;

        var $dom = document.querySelector('[data-i18n='+ key +']');

        if(i18nKey in window.i18n){
            var str = window.i18n[i18nKey];

            if(domKey){
                domKey = domKey[0].substr(2, domKey[0].length-4);
                $dom.setAttribute(domKey, str);
            }else{
                $dom.innerHTML = str;
            }

        }else{
            if(domKey){
                domKey = domKey[0].substr(2, domKey[0].length-4);
                $dom.setAttribute(domKey, i18nKey);
            }else{
                $dom.innerHTML = key;
            }
        }

        return this;
    };

    I18N.prototype.translateAll = function (el) {
        var _this = this,
            $el = tyoeof(el) === 'string' ? document.querySelector(el) || document : document,
            $i18n = $el.querySelectorAll('[data-i18n]');

        for(var i = 0; i < $i18n.length; i ++){
            var $dom = $i18n[i],
                _key = $dom.getAttribute('data-i18n');

            _this.t(_key);
        }

        return this;
    };

    window.i18n = window.i18n || {};
    window.I18N = new I18N().translateAll();
})();