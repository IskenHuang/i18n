(function($){
    var I18N = function(){};

    I18N.prototype.lng = function lng() {
        return $('html').attr('lang').toUpperCase() || 'EN-US';
    };

    I18N.prototype.t = I18N.prototype.translate = function translate(key) {
        if(!key) {
            return this;
        }

        // catch [attr-key]i18n-key
        var _regex = new RegExp('^\\[\\S*\\]', 'i'),
            domKey = key.match(_regex);

        key = (domKey) ? key.replace( _regex, '') : key;

        var $dom = $('[data-i18n$='+ key +']');

        if(key in window.i18n){
            var str = window.i18n[key];

            if(domKey){
                domKey = domKey[0].substr(1, domKey[0].length-2);
                $dom.attr(domKey, str);
            }else{
                $dom.text(str);
            }

        }else{
            $dom.text(key);
        }

        return this;
    };

    I18N.prototype.translateAll = function translateAll() {
        var _this = this,
            $i18n = $('[data-i18n]');

        $i18n.each(function(index){
            var $dom = $($i18n[index]),
                _key = $dom.attr('data-i18n');
            _this.t(_key);
        });

        return this;
    };

    if(!window.i18n){
        window.i18n = {};
    }
    window.I18N = new I18N().translateAll();
})(jQuery);