"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./../environment");
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var fs = require('fs');
var path = require('path');
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer_1.default({ storage: storage });
exports.PictureController = function (app) {
    var pictureRouter = express_1.default.Router();
    pictureRouter.get('/', function (req, res) {
        res.send('Hello picture');
    });
    pictureRouter.post('/', upload.single('picture'), function (req, res, next) {
        var file = req.file;
        try {
            if (!file) {
                var error = new Error('PLease upload a file');
                return next(error);
            }
            res.send(file);
        }
        catch (error) {
            res.send(error);
        }
    });
    pictureRouter.get('/:nameFile', upload.single('picture'), function (req, res, next) {
        var name = req.params.nameFile;
        try {
            res.sendFile(path.resolve("images/" + name));
        }
        catch (error) {
            res.send(error);
        }
    });
    app.use(environment_1.environment.baseUrl + '/picture', pictureRouter);
};
