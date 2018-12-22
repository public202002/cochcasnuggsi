window.customElements =
  window.customElements
  || {/* microfill */}

void ( _ => { /* CustomElementRegistry */

  customElements.define = ( name, constructor ) => {

    !! /\-/.test (name)
    && (customElements [name] = constructor)
    && [].slice
      // https://www.nczonline.net/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall
      .call ( document.querySelectorAll (name) )
      .map  ( customElements.upgrade )
  }


  // https://html.spec.whatwg.org/multipage/custom-elements.html#upgrades
  customElements.upgrade = function (node) {

    const candidates = []

    // Here's where we can swizzle
    // https://github.com/whatwg/html/issues/1704#issuecomment-241881091

    Object.setPrototypeOf
      (node, customElements [node.localName].prototype)

    node.connectedCallback ()
  }


  void (new MutationObserver ( mutations => {

    for (let mutation of mutations)
      for (let node of mutation.addedNodes)

         !! /\-/.test (node.localName)
         && customElements [node.localName]
         && customElements.upgrade (node)
  }))

  .observe (document.documentElement, { childList: true, subtree: true })

})() /* CustomElementRegistry */

