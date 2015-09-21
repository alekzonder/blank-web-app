module.exports = ModelAbstract;

/**
 * +get
 * +find
 * +updateOne
 * +create
 * +removeOne
 * -update
 * -remove
 */

function ModelAbstract(config, db) {
    this._config = config;
    this._db = db;
}

ModelAbstract.prototype._config = null;
ModelAbstract.prototype._db = null;

ModelAbstract.prototype.create = function (data) {

    var that = this;

    return new Promise(function (resolve, reject) {

        if (!data.id) {
            reject(new Error('no data id for insert'));
            return;
        }

        data._id = data.id;

        that._db.insert(data, function (err, doc) {
            if (err) {
                // todo custom model error
                reject(err);
                return;
            }

            resolve(doc);
        });
    });
};


ModelAbstract.prototype.get = function (id) {
    var that = this;

    return new Promise(function (resolve, reject) {
        that._db.find({_id: id}, function (err, docs) {
            if (err) {
                reject(err);
                return;
            }

            if (docs && docs.length) {
                resolve(docs[0]);
            } else {
                resolve(null);
            }
        });
    });
};

ModelAbstract.prototype.find = function (params, sort, limit, offset) {

    var that = this;

    return new Promise(function (resolve, reject) {

        var q = that._db.find(params);

        if (sort) {
            q.sort(sort);
        }

        if (limit) {
            q.limit(limit);
        }

        if (offset) {
            q.skip(offset);
        }

        q.exec(function (err, docs) {
            if (err) {
                reject(err);
                return;
            }

            resolve(docs);
        });
    });

};


ModelAbstract.prototype.updateOne = function (filters, data) {
    var that = this;

    return new Promise(function (resolve, reject) {
        that._db.update(filters, data, {}, function (err, num) {
            if (err) {
                reject(err);
                return;
            }

            resolve(data);
        });
    });
};

//ModelAbstract.prototype.update = function(filters, data) {};

ModelAbstract.prototype.removeOne = function (filters) {
    var that = this;

    return new Promise(function (resolve, reject) {
        that._db.remove(filters, {}, function (err, count) {
            if (err) {
                reject(err);
                return;
            }

            resolve(count);
        });
    });
};

ModelAbstract.prototype.clear = function () {

    var that = this;

    return new Promise(function(resolve, reject) {
        that._db.remove({}, {multi: true}, function (err, numRemoved) {
            if (err) {
                reject(err);
                return;
            }

            resolve(numRemoved);
        });
    });
};

//ModelAbstract.prototype.remove = function() {};
