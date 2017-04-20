class TokenList {

  constructor (node) {

    const
      textify = node =>
        (node.text = node.data, node)

    , symbolize = symbol =>
        symbol.match (/{(\w+)}/g) [0]

    , insert = token =>
        symbol => this [symbol] = token

    , tokenize = token =>
        token.textContent
          .match (/{(\w+)}/g)
            .map (symbolize)
            .map (insert (token))

    var a = this
      .sift (node)
//    .map  (textify)
//    .map  (tokenize)

  }

  bind (context, node) {
    console.log (context, this)

    for (const property in this)
      node = this [property]
      , node.data = node.text

    for (const property in this)
      node = this [property]
      , node.data = node.data
          .replace ('{'+property+'}', context [property])

    return this
  }

  sift (node, nodes = []) {

    const
      visit = node =>
        /({\w+})/g.exec (node.data) // stored regex is faster https://jsperf.com/regexp-indexof-perf
          && NodeFilter.FILTER_ACCEPT

    , walker =
        document.createNodeIterator
          (node, NodeFilter.SHOW_TEXT, visit)
          // by default breaks on template YAY! 🎉

    while (node = walker.nextNode ())
      nodes.push (node)

    console.log ('a', nodes)

    return nodes
  }


  zip (...elements) { const zipper = []

    , lock = (zipper, row) => [...zipper, ...row]
    , pair = teeth  => // http://english.stackexchange.com/questions/121601/pair-or-couple
      // thunk
        (tooth, position) => [tooth, teeth [position]]

    return elements [1]
      .map (pair (elements [0]))
      .reduce (lock)
  }

  slice (text) { const tokens  = []

   , match     = /({\w+})/g // stored regex is faster https://jsperf.com/regexp-indexof-perf
    , replace  = token => (collect (token), '✂️')
    , collect  = token => tokens.push (token)
    , sections = text
        .replace (match, replace)
          .split ('✂️')

    return zip (tokens, sections)
       .filter (element => element)
          .map (element => new Text (element))
  }
}

// INTERESTING! Converting `Template` to a class increases size by ~16 octets

//class Template {

//  constructor ( name = 'snuggsi' ) {
//    return Object.assign (this.factory (...name), { bind: this.bind })
//  }

//  bind (context) {
//    context = Array.isArray (context) ? context : [context]
//  }

//  factory (name) {
//    return (
//      document.querySelector ('template[name='+name+']').cloneNode (true)
//        || document.createElement ('template'))
//  }
//}

const Template = function ( name = 'snuggsi' ) {

  this.dependents = []

  return Object.assign
    (document.querySelector ('template[name='+name+']'), { bind } )

  function bind (context) {
    this.dependents = this.dependents || []


    context = Array.isArray (context) ? context : [context]

    const
      records   = []
    , dependant = undefined

    while
      (dependent = this.dependents.pop ())
        dependent.remove ()


    for (const item of context) {
      let
        clone  = this.cloneNode (true)
      , tokens = (new TokenList (clone ))

      tokens.bind (item)
      records.push (clone.content)
    }

    records.map
      (function (record) { this.dependents.push (...record.childNodes) }, this)

    this.after (...records)

    return this
  }
}
const EventTarget = Element =>

  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // WHATWG Living Standard HTML5 EventTarget
  // https://dom.spec.whatwg.org/#eventtarget
  //
  // MDN EventTarget
  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
  //
  // DOM Level 3 EventTarget
  // https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget
  //
  // DOM Level 2 EventTarget
  // (AKA Str🎱  W3C #fockery) ➡️  https://annevankesteren.nl/2016/01/film-at-11
  // 😕  https://w3c.github.io/uievents/DOM3-Events.html#interface-EventTarget
  //❓❓ https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html
  // https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget
  // Within https://w3c.github.io/uievents/#conf-interactive-ua
  // EventTarget links to WHATWG - https://dom.spec.whatwg.org/#eventtarget

(class extends Element {

  listen (event, listener = this [event])

    // MDN EventTarget.addEventListener
    // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    //
    // WHATWG Living Standard EventTarget.addEventListener
    // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
    //
    // DOM Level 2 EventTarget.addEventListener
    // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-addEventListener

    { this.addEventListener (event, listener) }

//ignore (event, listener = 'on' + this [event])
//  // MDN EventTarget.removeEventListener
//  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener
//  //
//  // WHATWG Living Standard EventTarget.removeEventListener
//  // https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
//  //
//  // DOM Level 2 EventTarget.removeEventListener
//  // https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-removeEventListener

//  { this.removeEventListener (event, listener) }

//dispatch (event)
//  // MDN EventTarget.dispatchEvent
//  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
//  //
//  // WHATWG Living Standard EventTarget.dispatchEvent
//  // https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent
//  //
//  // DOM Level 2 EventTarget.dispatchEvent
//  //  https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget-dispatchEvent

//  { }
})
const ParentNode = Element =>

  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // Living Standard HTML5 ParentNode
  // https://dom.spec.whatwg.org/#parentnode
  //
  // MDN ParentNode
  // https://developer.mozilla.org/en-US/docs/Web/API/ParentNode
  //
  // ElementTraversal interface
  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal

(class extends Element {

  // http://jsfiddle.net/zaqtg/10
  // https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator
  // https://www.w3.org/TR/DOM-Level-2-Traversal-Range/traversal.html
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeFilter
  // NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT

  selectAll (selector)
    { return this.querySelectorAll (selector) }

  select (selector)
    // watch out for clobbering `HTMLInputElement.select ()`
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
    { return this.selectAll (selector) [0] }

  get tokens () {
    return this._tokens = // This is Janky
      this._tokens || new TokenList (this)
  }
})

//function comb
//  // ElementTraversal interface
//  // https://www.w3.org/TR/ElementTraversal/#interface-elementTraversal
//
//(parent) {
//  if (parent.hasChildNodes())
//    for (let node = parent.firstChild; node; node = node.nextSibling)
//      comb (node)
//}
const GlobalEventHandlers = Element =>

  // DOM Levels
  // (https://developer.mozilla.org/fr/docs/DOM_Levels)
  //
  // Living Standard HTML5 GlobalEventHandlers
  // https://html.spec.whatwg.org/multipage/webappapis.html#globaleventhandlers
  //
  // MDN GlobalEventHandlers
  // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers
  //
  // MDN on* Events
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers
  //
  // DOM Level 0
  // This event handling model was introduced by Netscape Navigator,
  // and remains the most cross-browser model as of 2005
  // https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#DOM_Level_0
  //
  // Inline Model
  // https://en.wikipedia.org/wiki/DOM_events#DOM_Level_0#Inline_model
  //
  // Traditional Model
  // https://en.wikipedia.org/wiki/DOM_events#Traditional_model
  //
  // Traditional Registration
  // http://www.quirksmode.org/js/events_tradmod.html

(class extends Element {

  register (events = event => /^on/.exec (event)) {

    let
      nodes = // CSS :not negation https://developer.mozilla.org/en-US/docs/Web/CSS/:not
        // How can we select elements with on* attribute? (i.e. <... onclick=foo onblur=bar>)
        // If we can do this we can only retrieve the elements that have a traditional inline event.
        // This is theoretically more performant as most elements won't need traditional event registration.
        ':not(script):not(template):not(style):not(link)' // remove metadata elements

    , children =
        Array
          .from (this.querySelectorAll (nodes))

    , registered = node =>
        Array.from (node.attributes)
          .map (attr => attr.name)
          .filter (events)
          .length > 0

    , handle =
        (event, handler = (/{\s*(\w+)\s*}/.exec (event) || []) [1])  =>
          handler
            && Element [ handler ].bind (this)
            || event
            || null

    , reflect =
        self => // `this` closure
          node =>

            Array
              .from (node.attributes)
              .map (attr => attr.name)
              .filter (events)
              .filter (name => this [name] !== undefined)
              .map (reflection (node))

    , reflection =
        node => // closure
          event => {
            node [event] = handle (node [event]) }

    , mirror = handler=>
        !!! this [handler]
        && (this [handler] = Element [handler].bind (this))


    void [this]
      .concat (children)
      .filter (registered)
      .map (reflect (this))

    Object
      .getOwnPropertyNames (Element)
      .filter (events)
      .map (mirror)

    return this
  }
})
var ElementPrototype = window.Element.prototype // see bottom of this file

const Element = function
  (tag, CustomElementRegistry = window.customElements )

  //https://gist.github.com/allenwb/53927e46b31564168a1d
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-271031208
  // https://github.com/w3c/webcomponents/issues/587#issuecomment-254017839

{ tag = tag [0]

  return function (HTMLElement) // https://en.wikipedia.org/wiki/Higher-order_function
  { // Should this be a class❓❓❓❓

    const context = this === window ? {} : this

//  try
//    { return new CustomElementRegistry.get (tag) }

//  catch (_)
//    { /* console.warn('Defining Element `'+tag+'` (class {})') */ }

    class HTMLCustomElement extends // mixins

      EventTarget ( ParentNode ( GlobalEventHandlers ( HTMLElement )))

    { // exotic object - https://github.com/whatwg/html/issues/1704

      constructor () { super ()
        this.context = context

        super.initialize && super.initialize ()
      }

      render () {
        // template = super.render ()
        // Where should this insert?
        // What about the meta elements (i.e. script, style, meta)

        this.tokens.bind (this)

        void (function (templates) {
          const
            bind = (template) => {
              const name = template.getAttribute ('name')

              void (new Template (name))
                .bind (this [name])
            }

          templates.map (bind)
        })
        .call (this, Array.from (this.selectAll ('template[name]')))

        this.register ()
      }

      // custom element reactions
      connectedCallback () {
        void ( super.constructor.onconnect
          || super.connectedCallback
          || function noop () {}
        ).call (this)

        this.render ()
      }
    }

//  try
//    {
        CustomElementRegistry.define (tag, HTMLCustomElement)
//    }

//  finally
//    {
        return CustomElementRegistry.get (tag)
//    }
  }
}

// Assign `window.Element.prototype` in case of feature checking on `Element`
Element.prototype = ElementPrototype
  // http://2ality.com/2013/09/window.html
  // http://tobyho.com/2013/03/13/window-prop-vs-global-var
  // https://github.com/webcomponents/webcomponentsjs/blob/master/webcomponents-es5-loader.js#L19
