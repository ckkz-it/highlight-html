# Highlight HTML JavaScript Plugin

> Highlight any HTML syntax of your tags, attributes and values simply by inputting your html code into plugin and get ready to use highlighted html.

Plugin is not only highlight HTML, it also keeps original markup.

License: [MIT](https://mit-license.org)

[![Highlight HTML](https://raw.githubusercontent.com/ckkz-it/highlight-html/master/img/demo.png "Highlight HTML")](https://raw.githubusercontent.com/ckkz-it/highlight-html/master/img/demo.png)

## Requirements

IE9+

## Usage

First of all, include `highlight-html.min.js` in your html file.

```html
<script src="js/highlight-html.min.js"></script>
```

Now, there are two ways of using plugin.

You can either set any css `selector` as an input

```js
highlightHTML('.input', {
  output: '.output'
});
```

or throw html code manually.

```js
highlightHTML('<div class="my-class">Like this</div>', {
  inputType: 'manual',
  output: '.output'
});
```

So there's an availiable options.

## Options

#### mode

```js
highlightHTML('.input', {
  mode: 'append',
  output: '.output'
});
```

Two options are available. In `append` (default) mode you have to define `output` for code to append. In `return` mode function is returning highlighted html value. In this case you may skip `output` option.

```js
let out = highlightHTML('.input', {
  mode: 'return'
});
```

#### inputType

As mentioned before, there are two types of input your html code.

First, and default, is `selector`, where you type casual css selector to chose where html code would be taken. Second is `manual`. Just type text as string into a function.

Following code will ouput html from `.input` area to `.output` area.

```js
highlightHTML('.input', {
  inputType: 'selector',
  output: '.output'
});
```

This one will append `<p>` tag to `.output`.

```js
highlightHTML('<p class="text" data-method="Manual method">Pretty simple</p>', {
  inputType: 'manual',
  output: '.output'
});
```

#### Classes (tagClass, valueClass, attrClass)

There are three default classes that highlight html.

```css
.tag {
  font-weight: bold;
  color: #A7413E;
}
.attr {
  color: #D2945D;
}
.val {
  color: #90C362;
}
```

After initializing the plugin they will append to `head` as a `style` tag.

You can edit them in your css (remember to set `!important` because of higher `style` tag priority) or totally re-define. And also, which is a better way, you can set your own classes.

```js
highlightHTML('.input', {
  output: '.output'
  tagClass: 'my-tag',
  valueClass: 'my-val',
  attrClass: 'my-attr',
});
```

## Known issues

1. There are only 5 attributes highlighting in one tag.
E.g. `<input type="checkbox" name="new" class="form" id="my-checkbox" title="input">`
Others after 5th won't be colored.
2. Naming one of the classes `value` causes highlight problems (only on the `.output` area though).
3. Attributes without value (e.g. `checked`, `disabled`) highlighting only if you put them in the end of tag. And only one will be highlighted.