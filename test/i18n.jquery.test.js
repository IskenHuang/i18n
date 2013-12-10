describe('i18n :: ', function() {
    var stringify = JSON.stringify;
    window.i18n = { title: 'This is title string.'};

    describe('Normal case :: "<div data-i18n="title"></div>" ', function(){
        beforeEach(function(done){
            JSON.stringify = function(obj) {
                var seen = [];

                return stringify(obj, function(key, val) {
                    if (typeof val === 'object') {
                        if (seen.indexOf(val) >= 0) { return; }
                        seen.push(val);
                    }
                    return val;
                });
            };

            $('body').append('<div data-i18n="title"></div>');
            $('body').append('<div data-i18n="footer"></div>');
            done();
        });

        afterEach(function(done) {
            JSON.stringify = stringify;
            $('[data-i18n]').remove();
            done();
        });

        it('should be translate and fill i18n value to element', function() {
            I18N.translate('title');
            $('[data-i18n=title]').html().should.equal('This is title string.');
        });

        it('should be fill key because cannot find key in window.i18n', function() {
            I18N.translate('footer');
            $('[data-i18n=footer]').html().should.equal('footer');
        });

        it('should be translateAll keys and title will be "This is title string."', function() {
            I18N.translateAll();
            $('[data-i18n=title]').html().should.equal('This is title string.');
        });

        it('should be translateAll keys and title will be "footer"', function() {
            I18N.translateAll();
            $('[data-i18n=footer]').html().should.equal('footer');
        });
    });

    describe('attribute case :: "<div data-i18n="__title__title"></div>" ', function(){
        beforeEach(function(done){
            JSON.stringify = function(obj) {
                var seen = [];

                return stringify(obj, function(key, val) {
                    if (typeof val === 'object') {
                        if (seen.indexOf(val) >= 0) { return; }
                        seen.push(val);
                    }
                    return val;
                });
            };

            $('body').append('<div data-i18n="__title__title"></div>');
            $('body').append('<div data-i18n="__title__footer"></div>');
            done();
        });

        afterEach(function(done) {
            JSON.stringify = stringify;
            $('[data-i18n]').remove();
            done();
        });

        it('should translate value to key', function() {
            I18N.translate('__title__title');
            $('[data-i18n=__title__title]').html().should.equal('');
        });

        it('should translate attribute to value', function() {
            I18N.translate('__title__title');
            $('[data-i18n=__title__title]').attr('title').should.equal('This is title string.');
        });

        it('should be fill key because cannot find key in window.i18n', function() {
            I18N.translate('__title__footer');
            $('[data-i18n=__title__footer]').html().should.equal('');
        });

        it('should be fill key because cannot find key in window.i18n', function() {
            I18N.translate('__title__footer');
            $('[data-i18n=__title__footer]').attr('title').should.equal('footer');
        });

        it('should translateAll keys', function() {
            I18N.translateAll();
            $('[data-i18n=__title__title]').html().should.equal('');
        });

        it('should translateAll keys with attribute', function() {
            I18N.translateAll();
            $('[data-i18n=__title__title]').attr('title').should.equal('This is title string.');
        });

        it('should translateAll keys with attribute', function() {
            I18N.translateAll();
            $('[data-i18n=__title__footer]').attr('title').should.equal('footer');
        });
    });
});
