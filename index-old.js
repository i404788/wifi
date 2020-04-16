const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const compression = require('koa-compress');
const router = require('koa-router')();
const kstatic = require('koa-static');
const convert = require('koa-convert');

const app = new Koa();

const Pug = require('koa-pug');

new Pug({
  app: this.app, // make sure to place this after creating a Koa app
  viewPath: './views/'
});


// make a directory called "static" and link directly to the files inside there
// use koa-convert to make it compatible with Koa v2.0
app.use(convert(kstatic(__dirname + '/static')));

// read POST requests and cookies
app.use(bodyParser());

// use common features to make uploads and downloads smaller
app.use(compression());


// support different functions for different pages on the server
app.use(router.routes())
  .use(router.allowedMethods());

  
  router.get('/', ctx => {
    ctx.render('index');
  });
  
// start the server
app.listen(3000);