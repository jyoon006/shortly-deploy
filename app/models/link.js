// var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
// var environment = process.env.NODE_ENV || 'development';

// if (environment === 'development') {

//   var Link = db.Model.extend({
//     tableName: 'urls',
//     hasTimestamps: true,
//     defaults: {
//       visits: 0
//     },
//     initialize: function(){
//       this.on('creating', function(model, attrs, options){
//         var shasum = crypto.createHash('sha1');
//         shasum.update(model.get('url'));
//         model.set('code', shasum.digest('hex').slice(0, 5));
//       });
//     }
//   });

// }
  //add functions
  var Schema = mongoose.Schema;
  var urlSchema = new Schema ({
    url: String,
    base_url: String,
    code: String,
    title: String,
    visit: Number
  }, {
    timestamps: true
  });
  
  var Link = mongoose.model('Link', urlSchema);

  urlSchema.pre('save', function(next) {
    var shasum = crypto.createHash('sha1');
    shasum.update(this.url);
    this.code = shasum.digest('hex').slice(0, 5);
    next();
  });

  

module.exports = Link;
