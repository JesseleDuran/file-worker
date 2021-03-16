'use strict';

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('locations', {
    lat: 'double precision',
    lon: 'double precision',
    postcode: {type: "string", length: 15}
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('locations', callback);
};

exports._meta = {
  "version": 1
};


