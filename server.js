var connect = require('connect');
var serveStatic = require('serve-static');
var servingEntity = __dirname;
if(process.env.MAINT_MODE == 1) {
  servingEntity += '/maint';
} else {
  servingEntity += '/build';
}
console.log('MODE ' + process.env.MAINT_MODE)
connect().use(serveStatic(servingEntity)).listen(8080, function(){
    console.log(servingEntity + ';' + ' Server running on 8080...');
});
