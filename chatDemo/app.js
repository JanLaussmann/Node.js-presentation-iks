// module dependencies.
var express = require('express')
  , nowjs = require('now')
  , routes = require('./routes');

// configuration
var app = module.exports = express.createServer();
app.configure(function(){
  app.set('views', __dirname + '/views');
  // render html
  app.set("view options", {layout: false});
  app.register('html', {
    compile: function(str, options){
      return function(locals){
        return str;
      };
    }
  });

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// routes
app.get('/', routes.index);

// start app
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// Now.js
var everyone = nowjs.initialize(app);

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(message);
};
