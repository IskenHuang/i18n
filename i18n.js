(function(){
    var I18N = function(){};

    I18N.prototype.lng = function lng() {
        var lang = document.querySelector('html').getAttribute('lang');
        return (lang) ? lang.toUpperCase() : 'EN-US';
    };

    I18N.prototype.t = I18N.prototype.translate = function translate(key) {
        if(!key) {
            return this;
        }

        // catch [attr-key]i18n-key
        var _regex = new RegExp('^\\[\\S*\\]', 'i'),
            domKey = key.match(_regex);

        key = (domKey) ? key.replace( _regex, '') : key;

        var $dom = document.querySelector('[data-i18n$='+ key +']');

        if(key in window.i18n){
            var str = window.i18n[key];

            if(domKey){
                domKey = domKey[0].substr(1, domKey[0].length-2);
                $dom.setAttribute(domKey, str);
            }else{
                $dom.innerHTML = str;
            }

        }else{
            $dom.innerHTML = key;
        }

        return this;
    };

    I18N.prototype.translateAll = function translateAll() {
        var _this = this,
            $i18n = document.querySelectorAll('[data-i18n]');

        for(var i = 0; i < $i18n.length; i ++){
            var $dom = document.querySelectorAll('[data-i18n]:nth-child(' + i + ')'),
                _key = $dom.getAttribute('data-i18n');

            _this.t(_key);
        }

        return this;
    };

    if(!window.i18n){
        window.i18n = {};
    }
    window.I18N = new I18N().translateAll();
})();