# i18n translate in javascript
i18n.js is pure javascript support ie8+. Detail support browser information you can find on [caniuse.com/queryselector](http://caniuse.com/queryselector). i18n.jquery.js base on [jquery](http://jquery.com/). Both version do the same thing on if you need to use jquery.

# how to use
```
<script>
    window.i18n = {
      hello: "Hello~"
    };
</script>

<div data-i18n="hello"></div>
// after translate
// <div data-i18n="hello">Hello~</div>

<div data-i18n="__title__hello"></div>
// <div data-i18n="__title__hello" title="Hello~"></div>
```

# methods
## t or translate
```
<script>
    window.i18n = {
        hello: 'Hello~'
    };
    I18N.t('hello'); // return 'Hello~';

    /**
     * using in dom elements
     * before translate
     * <div data-i18n="hello"></div>
     *
     * after translate
     * <div data-i18n="hello">Hello~</div>
     *
     * before translate attribute
     * <img data-i18n="__alt__hello" />
     *
     * after translate attribute
     * <img data-i18n="__alt__hello" alt="Hello~" />
     */
</script>

```

## translateAll
translate all element with `[data-i18n]` attribute or `I18N.translateAll('.info')`. When translateAll the first params is sting will only translate all `[data-i18n]` node in the `documents.querySelector('.info')`

## lng
```
/**
 * <html lang="EN-US">
 *      ...
 * </html>
 */
<script>
    // get html tag lang attribute. when lang attribute is empty will return EN-US
    console.log('lang = ', I18N.lng());
</script>
```

# L10N
All l10n language setup in an object. for example:
```
window.l10n = {
    'EN-US': {
        hello: 'Hello~'
    },
    'ZH-TW': {
        hello: '哈囉～',
    }
}
```

## L10N.updateLang
update current language. will reset `html` lang attribute and fire `I18N.translateAll()`
```
L10N.updateLang('ZH-TW')
```

# test
`npm test`
