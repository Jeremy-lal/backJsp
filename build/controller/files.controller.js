"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("../environment");
var express_1 = __importDefault(require("express"));
var file_service_1 = require("../services/file.service");
var jwt = require("express-jwt");
var path = require('path');
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer_1.default({ storage: storage });
exports.FilesController = function (app) {
    var fileRouter = express_1.default.Router();
    var fileService = new file_service_1.FileService();
    fileRouter.post('/', upload.single('file'), function (req, res, next) {
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
    fileRouter.get('/:nameFile', upload.single('picture'), function (req, res, next) {
        var name = req.params.nameFile;
        try {
            res.sendFile(path.resolve("files/" + name));
        }
        catch (error) {
            res.send(error);
        }
    });
    if (environment_1.environment.JWT_SECRET) {
        fileRouter.use(jwt({ secret: environment_1.environment.JWT_SECRET }));
    }
    else {
        throw new Error('Secret is not defined');
    }
    fileRouter.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!req.user) return [3 /*break*/, 2];
                    return [4 /*yield*/, fileService.getAll()];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    res.send('Vous n\'êtes pas authorisé à faire cette requête.');
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    res.send(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    fileRouter.post('/file', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var file, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!req.user) return [3 /*break*/, 3];
                    return [4 /*yield*/, fileService.save(file)];
                case 2:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 4];
                case 3:
                    res.send('Vous n\'êtes pas authorisé à faire cette requête.');
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    res.send(error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    fileRouter.delete('/:id', function (req, res) {
        var id = parseInt(req.params.id, 10);
        try {
            if (req.user) {
                fileService.deletefile(id);
                res.send();
            }
            else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        }
        catch (error) {
            res.status(404).send('L\'id n\'a pas été trouvé' + id);
        }
    });
    app.use(environment_1.environment.baseUrl + '/files', fileRouter);
};
