squeezeText
======

Squeezes text into it's parent HTML element. Will limit the text's height to one single line!

## Installation

Download the library [manually](https://github.com/joinbox/squeezetext) or through bower: 

```bash
$ bower install squeezetext
```

## Requirements

Requres jQuery or Zepto. 

## Use

```javascript
$( function() {
    $( '.selector' ).squeezeText();
}
```

## Configuration

By default, the plugin only fits the text to the parent element's **width**. There are two options available to change that behaviour: 

- squeezeWidth (default true)
- squeezeHeight (default false)

```javascript
var options = {
    squeezeWidth     : false
    , squeezeHeight  : true
}
$( '.selector' ).squeezeText( options );
```
