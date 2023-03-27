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




class Weather {

  constructor (latitude, longitude) {
  }

  locate (latitude, longitude) {

    const api = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?'

    + 'lat='    + latitude
    + '&lon='   + longitude
    + '&appid=' + this.key
    + '&units=imperial'

    return fetch (api)
      .then (response => response.json ())
  }

  static get api () {
  }

  get key () // from openweathermap.org
    { return 'aab335551208fe6d0699c3a0e033ff00' }

}




Element `weather-viewer`

  (class extends HTMLElement {

    initialize () {
      this.context.city = {}

      this.locate ()

      void (new Weather)
        .locate (this.latitude, this.longitude)
        .then (this.onforecast.bind (this))
    }

    get latitude ()
      { return this.getAttribute ('latitude') }

    get longitude ()
      { return this.getAttribute ('longitude') }

    get name ()
      { return this.context.city.name }

    get temperature ()
      { return this.context.city.temperature }

    get image ()
      { return 'https://cache-graphicslib.viator.com/graphicslib/destination/new-york-city-154345.jpg' }

    locate () {
      navigator
        .geolocation
        .getCurrentPosition
          (this.onlocate, error => alert (error))
    }

    onforecast (weather) {
      this.context.city =
        { name: weather.name, temperature: weather.main.temp }

      this.render ()
    }

    onlocate (position) {
      position.coords
        .latitude

      position.coords
        .longitude
    }

  })