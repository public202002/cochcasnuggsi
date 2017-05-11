<p align="center">
  <h1 align="center">snuggsi ツ - Easy Web Components in
    <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme>1Kb</a>
  </h1>
</p>

<p align="center">
  <a href=https://npmjs.org/package/snuggsi>
    <img alt='NPM monthly downloads' src=https://img.shields.io/npm/dm/snuggsi.svg?style=flat>
  </a>

  <a href=https://github.com/devpunks/snuggsi/tree/master/dist#readme>
    <img alt='Brotli size' src=https://img.shields.io/badge/Brotli%20size:-1Kb-brightgreen.svg>
  </a>

  <a href=https://www.npmjs.com/package/snuggsi>
    <img src=https://img.shields.io/npm/v/snuggsi.svg alt='npm version'>
  </a>

  <a href=https://david-dm.org/devpunks/snuggsi target=external>
    <img src=https://david-dm.org/devpunks/snuggsi/status.svg alt='dependency status'>
  </a>

  <a href=https://github.com/devpunks/snuggsi/blob/master/LICENSE.txt target=external>
    <img src=https://img.shields.io/npm/l/snuggsi.svg alt=license>
  </a>

  <a href='https://codecov.io/github/devpunks/snuggsi?branch=master' target=external>
    <img src=https://codecov.io/gh/devpunks/snuggsi/branch/master/graph/badge.svg alt='Coverage via Codecov'>
  </a>

  <a href=https://github.com/devpunks/snuggsi/issues target=external>
    <img src=https://img.shields.io/badge/PRs-welcome-brightgreen.svg alt='Pull requests welcome!'>
  </a>

<p align=center>
  <strong align="center">All you need is a browser and basic knowledge of HTML &amp; Javascript to be productive!</strong>

<p align=center>
  "Performance is the art of avoiding work" - #FreeJewelry :ring: :gem:


## Why ?
  1. You prefer [convention over configuration](https://en.wikipedia.org/wiki/Convention_over_configuration)
  2. Because [You (probably) don't need a Javascript Framework](https://slack-files.com/T03JT4FC2-F151AAF7A-13fe6f98da)
  3. Web Components ARE [ready for production](https://twitter.com/WebReflection/status/761316429559922688)

     &amp; [Custom Elements v1](https://www.w3.org/TR/custom-elements) has full
     [support for every modern browser including Internet Explorer 11+ / Edge](https://github.com/webcomponents/webcomponentsjs#browser-support)


## Easy Installation
Node.js, Webpack, Babel, or Gulp can be used but is not a requirement.

Simply place the following `<script>` anywhere in your webpage
```html
<!-- http(s): protocol required locally -->
<script async nomodule src=//unpkg.com/snuggsi></script>
```

Et Voila _(that's it!)_

See [ECMAScript Module Imorts](https://github.com/devpunks/snuggsi/wiki/Module-Imports)
for more details.


## Browser Support

  | Feature    | IE11+ | Edge* | Chrome* | Firefox* | Safari 9+* | Chrome Android* | Mobile Safari* |
  | ---------- |:-----:|:-----:|:-------:|:--------:|:----------:|:---------------:|:--------------:|
  | Custom Elements |✅ |✅ |✅ |✅ |✅ |✅ |✅ |
  | Templates |✅ |✅ |✅ |✅ |✅ |✅ |✅ |
  | HTML Imports |✅ |✅ |✅ |✅ |✅ |✅ |✅ |
  | Shadow Dom | | |✅ |✅ | | | |

  _\*Indicates the current version of the browser_

  The [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs)
  polyfills are intended to work in the latest versions of evergreen browsers.

Just insert the following polyfill `<script>` *before* snuggsiツ for classic browser support.

```html
<!-- webcomponents polyfill -->
<script src=//unpkg.com/snuggsi/examples/webcomponents-hi-ce.js></script>

<!-- snuggsiツ (modern) -->
<script type=module src=//unpkg.com/snuggsi></script>

<!-- snuggsiツ (classic) -->
<script nomodule src=//unpkg.com/snuggsi/snuggsi.min.js></script>
```


# Quick Tour

## [Element](/elements/element.es)
The following is a snippet from [examples/hello-word.html](/examples/hello-world.html)

_See [examples](/examples#readme) for more details._


Play [Hello World Demo](https://jsfiddle.net/rmv8e2vz/)
``` html
<hello-world>
 Hello {planet}
</hello-world>

<!-- http(s): protocol required locally -->
<script nomodule src=//unpkg.com/snuggsi></script>
<script nomodule async defer>

// Element Definition -----------------------------

Element `hello-world`

// Class Description ------------------------------

(class extends HTMLElement {

  get planet ()
    // "automagic" token binding
    { return 'world 🌎' }

  static onclick ()
    // "automagic" event registration
    { alert (this) }
})

</script>
```

## [Template](/elements/html-template-element.es)

`<template>` to appendable `DocumentFragment`.

You have a `<template>` in the DOM and you need to:

1. Bind a context (or Javascript object) to the template
2. Append rendered template to the document.
  - If `context` is an object `bind` a single `<template>`.
  - If `context` is a collection (i.e. `Array`) `bind` a tandem collection of `<template>`s.

See [MDN &lt;template&gt;](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
for more details

### Standalone Template

```html
<section id=lead></section>

<template name=developer>
  <!-- `{name}` will bind to `context` property `name` -->
  <h1>{name}</h1>
</template>

<script nomodule src=//unpkg.com/snuggsi></script>
<script nomodule>

const
  template = Template `developer`
, context  = { name: 'That Beast' }

template
  .bind (context)

document
  .getElementById ('lead')   // select element to append bound template
  .append (template.content) // .content returns an appendable HTMLDocumentFragment
  // see https://html.spec.whatwg.org/multipage/scripting.html#dom-template-content

/*
   <section id='lead'>
     <h1>That Beast</h1>
   </section>
*/

</script>
```


### Collection Template

```html
<ul>
  <template name=item>
    <li>Hello {name}!</li>
  </template>
</ul>

<script nomodule src=//unpkg.com/snuggsi></script>
<script nomodule>

// when context is a collection
const
  template = Template `item`
, context  = [ {name: 'DevPunk'}, {name: 'Snuggsi'} ]

template
   // internal template render for each item in context
  .bind (context)

document
  .querySelector ('ul')
  .append (template.content)

/*
<ul>
  <li>Hello DevPunk!</li>
  <li>Hello Snuggsi!</li>
</ul>
*/

</script>
```

## Build Process

Snuggsi is able to use modern compression algorithms to create
bundles as small as *~1500 OCTETS* _(or one 1500byte Ethernet packet frame)_

[Read More](https://github.com/devpunks/snuggsi/tree/master/dist#readme)


## Browse Examples
```bash
$ git clone https://github.com/devpunks/snuggsi.git
$ cd snuggsi && npm i
$ npm run browse
```

### Installation Dependencies
  - [Node.js](https://nodejs.org/en/download/)
  - [Tap](https://github.com/tapjs/node-tap)
  - [Browser Sync](https://browsersync.io)
  - [jsdom](https://github.com/tmpvar/jsdom)

## Testing

```bash
$ npm test
```

[jsdom](https://github.com/tmpvar/jsdom) is used heavily to produce this code.
It is an awesome test framework that implements a virtual dom based on the
WEB-IDL specifications that are used on the HTML5, CSS, and ECMAScript standards board.

JSDOM has the potential to be a replacement for phantomjs in most cases for a fraction of the memory thumbprint.

_"Update April 2016: since writing this post, I've moved to using tap which spawns individual processes for each test file, so I don't need this approach at all now."_

  - https://remysharp.com/2015/12/14/my-node-test-strategy
  - https://remysharp.com/2016/02/08/testing-tape-vs-tap

### Test Coverage
```bash
$ npm run cover
```

