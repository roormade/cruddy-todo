const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};
// let data = [];

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
  // const pushData = (id, text) => {
  //   console.log('ID HERE---->', id);
  //   data.push({ id, text });
  // };

  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw ('error reading all files');
    } else {
      for (var file in files) {
        var eachId = files[file].slice(0, 5);
        data.push({ id: eachId, text: eachId });
        //var txtFile = path.join(exports.dataDir, `${eachId}.txt`);
        // exports.readOne(eachId, (err, data) => {
        //   if (err) {
        //     callback(new Error(''));
        //   } else {
        //     console.log('data here -----> ', data);
        //     pushData(data.id, data.text);
        //   }

        // });

        // fs.readFile(txtFile, 'utf8', (err, text) => {
        //   if (err) {
        //     callback(new Error(`No item with id: ${id}`));
        //   } else {
        //     data.push({id: eachId, text: text});
        //   }
        // });
      }

      callback(null, data);
    }
  });
};


exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }

  var txtFile = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(txtFile, 'utf8', (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });//id: id, text: text
    }
  });
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });

  var txtFile = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(txtFile, (err, data) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(txtFile, text, (err) => {
        if (err) {
          console.log('error updating file');
        } else {
          callback(null, { id, text });
        }
      });

    }
  });

};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }

  var txtFile = path.join(exports.dataDir, `${id}.txt`);
  fs.rm(txtFile, (err) => {
    if (err) {
      callback(new Error('No item with id: ${id}'));
    } else {
      callback();
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
