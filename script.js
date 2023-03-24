Element `hello-kitty`

(class extends HTMLElement {

// CONSTRUCTOR ---------------------------------------

  initialize ()
    // see `meow` event handler
    { this.url = 'https://placekitten.com/400/400?image=' }


// PROPERTIES ----------------------------------------

  set icon // on element
    // default to html attribute
    ( value = this.getAttribute `icon` )
      // set html attribute to new value
      { this.setAttribute (`icon`, value) }

  get icon () // from element
    { return this.getAttribute `icon` }

  get greeting () // "✨ automagic" token binding
    { return `<hello-kitty> Carousel ${ this.icon }` }


// METHODS -------------------------------------------

  random () {
    return Math.round
      ( Math.random `` * 16 )
  }


// EVENT HANDLERS ------------------------------------

  onclick (e) {
    // "✨ automagic" global event handler registration
    alert (`You clicked on ${e.target.tagName} ${ this.icon }`)
  }

  pet ()
    { alert `Puuuuuurrrrrrrrrrrr!!!` }

  meow (e) { // custom handler
    e.preventDefault ``

    this.querySelector `img`
      .setAttribute (`src`, this.url + this.random () )

    // element will "✨ automagically" re-render !!!
  }
})
