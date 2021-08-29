"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbHandler = /** @class */ (function () {
    function DbHandler(connection) {
        this.connection = connection;
    }
    DbHandler.getInstance = function (connection) {
        if (!this.instance && connection != null) {
            this.instance = new DbHandler(connection);
        }
        return this.instance;
    };
    DbHandler.prototype.query = function (sql, args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query(sql, args, function (err, rows) {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    };
    DbHandler.prototype.close = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.end(function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(1);
            });
        });
    };
    return DbHandler;
}());
exports.DbHandler = DbHandler;
