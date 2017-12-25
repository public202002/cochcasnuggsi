// ONLY KILL KEEP-ALIVE WHEN
const
  { compressor, mixins, assets }
    = require ('middleware')


module.exports = class {

  constructor () {}


  serve (path = '', port = process.env.PORT) {

    path = Boolean (path += '')
      ? path
      : 'public'


    console.warn ('THE PATH IS', path)

    return (new (require ('koa')))
      // CHECK OUT CONNECT FOR MOUNTING MIDDLEWARE!!!!
      // https://github.com/senchalabs/connect#mount-middleware

//    .use ( require ('koa-cors') ({ methods: ['GET'] }) )

//    .use ( compressor )

//    .use ( mixins )

      .use ( assets (path) )

      .listen ( port, _ => {

        console.warn (`Serving ${path}/`)
        console.warn ('Listening on port', port)
      })
  }
}
