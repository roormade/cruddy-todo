const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId(callback);
  // items[id] = text;
  // callback(null, { id, text });

  counter.getNextUniqueId((err, id) => {

    var txtFile = path.join(exports.dataDir, `${id}.txt`);
    fs.writeFile(txtFile, text, (err) => {
      if (err) {
        console.log('error writing file');
      } else {
        callback(null, { id, text });
      }
    });

  });
};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);

  var data = [];
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw ('error reading all files');
    } else {
      // var dataIds = ids.split('.');

      // dataIds.forEach((id) => {
      //   id = id[0];
      //   data.push({id, text: id});
      // });

      // _.each(ids, (id) => {
      //   var eachId = ids.split('.')[0];
      //   data.push({id: eachId, text: eachId});
      // });

      for (var file in files) {
        var eachId = files[file].slice(0, 5);
        data.push({id: eachId, text: eachId});
      }

      callback(null, data);
    }
  });
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
