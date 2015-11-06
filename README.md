squeezeText
======

Squeezes text into it's parent HTML element. Pure vanilla JavaScript solution, no jQuery needed.

## Features

- Makes text fit a parent element's width and/or height. 
- The text's size is calculated by measuring both the text and the element, then applying the scale fatctor.
- Works even with texts that have CSS transformations applied to them.
- Provides a simple angular directive.

## Limitations
- Only works with texts that use one line; multi-line texts are not (yet?) supported.

## Installation

Download the library [manually](https://github.com/joinbox/squeezetext) or through bower: 

```bash
$ bower install squeezetext
```

## Requirements

None since v0.5 (previously jQuery or Zepto)

## Use

### Initialization

Just add the `data-squeeze` attribute to the elements whose text should fit the parent element: 

```html
<div data-squeeze style="width:50px;font-size:100px;">
  This text is way too big
</div>
```

All elements with a `data-squeeze` attribute will automatically be squeezed when the DOM is ready. 

To call squeezeText manually (e.g. when adding elements to the DOM after it has been ready), use

```javascript
  var elements = document.querySelectorAll( '.new-element' );
  window.squeezeText( elements );
```

You may call `window.squeezeText` with

- no argument (will be applied to all elements with `data-squeeze`)
- a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) (will be applied to all elements passed)
- an [Element](https://developer.mozilla.org/en-US/docs/Web/API/element) (will be applied to the element passed)

### Options

You may want to make a text only fit the width **or** height of its parent element. To do so, either use `data-squeeze-width="false"` or `data-squeeze-height="false"` on the element that has the `data-squeeze` attribute.

# Angular

To use squeezeText with angular, import both scripts and add the ```squeeze-text``` attribute to the concerned DOM element.