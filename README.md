# i18n translate in javascript
i18n.js is pure javascript support ie8+. Detail support browser information you can find on [caniuse.com/queryselector](http://caniuse.com/queryselector). i18n.jquery.js base on [jquery](http://jquery.com/). Both version do the same thing on if you need to use jquery.

# how to use
```
<script>
    window.hello = "Hello~";
</script>

<div data-i18n="hello"></div>
// after translate
// <div data-i18n="hello">Hello~</div>

<div data-i18n="[title]hello"></div>
// <div data-i18n="[title]hello" title="Hello~"></div>
```

# methods
## t or translate
```
<script>
    window.hello = "Hello~";
    I18N.t('hello');

    // before translate
    // <div data-i18n="hello"></div>
    //
    // after translate
    // <div data-i18n="hello">Hello~</div>
</script>

```

## translateAll
translate all element with [data-i18n] attribute

## lng
```
// <html lang="EN-US">
//      ...
// </html>
<script>
    // get html tag lang attribute. when lang attribute is empty will return EN-US
    console.log('lang = ', I18N.lng());
</script>
```

# test
`npm test`
