const
// Navigate to chrome://version
//path = '/usr/bin/chromium-browser'
  headless = true
, path     = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
, puppeteer
    = require ('puppeteer-core')


module.exports = async function ( url='https://snuggsi.com' ) {
  const
    browser
      = await puppeteer.launch ({ headless, executablePath: path })


  console.warn ('Browsing to', url, browser)

  void await (await browser.newPage ``)
    .goto (url)

  await browser.close ``
}


void (async function () {
  await module.exports()
})()


const
  encoding = 'utf8'
, root = `${process.env.NODE_PATH}/`

, { JSDOM, VirtualConsole }
    = require ('jsdom')
, open   = require ('fs').readFileSync
, dist   = '' // bundle (`${root}/dist/snuggsi.min`)

, source  = '' // bundle (`${root}/elements/element.html`)
            // https://github.com/tmpvar/jsdom/issues/1030
            // Unfortunately no support for custom elements... yet...
            // https://github.com/tmpvar/jsdom/pull/1872

function browse (interface) {
  interface + '' // flatten TTSL (Tagged Template String Literal) usage

  const
    file = read (`${root}element/${interface}.html`)
  , settings = { runScripts: 'dangerously', virtualConsole: (new VirtualConsole).sendTo (console) }
  , document = (new JSDOM (file, settings)).window.document

  , script    = document.createElement ('script')
  , snuggsi   = script.cloneNode ()
  , example   = script.cloneNode ()
  , polyfills = script.cloneNode ()

  , mutation_observer
    // taken from https://github.com/megawac/MutationObserver.js
    = read (`${root}polyfills/mutation-observer.js`)

  polyfills.textContent
    = [ mutation_observer, '\n' ].join ``

  snuggsi.textContent = dist
  example.textContent = source

  document.body.append (polyfills, snuggsi, example)

  return document
}


function bundle (lib)
  { return load (lib) }

function load (id)
  { return read (`${id}.es`) }

function read (path)
  { return open (find (path), encoding) }

function find (path)
  { return `${path}` }
