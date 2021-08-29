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
var user_service_1 = require("./../services/user.service");
var express_1 = __importDefault(require("express"));
var jwt = require("express-jwt");
exports.UserController = function (app) {
    var userRouter = express_1.default.Router();
    var userService = new user_service_1.UserService();
    if (environment_1.environment.JWT_SECRET) {
        userRouter.use(jwt({ secret: environment_1.environment.JWT_SECRET }));
    }
    else {
        throw new Error('Secret is not defined');
    }
    userRouter.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!req.user) return [3 /*break*/, 2];
                    return [4 /*yield*/, userService.getAll()];
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
                    res.send('Une erreur s\'est produite');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    userRouter.get('/groups', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    if (!req.user) return [3 /*break*/, 2];
                    return [4 /*yield*/, userService.getAllByGroups()];
                case 1:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 3];
                case 2:
                    res.send('Vous n\'êtes pas authorisé à faire cette requête.');
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    userRouter.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = parseInt(req.params.id, 10);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!req.user) return [3 /*break*/, 3];
                    return [4 /*yield*/, userService.getById(id)];
                case 2:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 4];
                case 3:
                    res.send('Vous n\'êtes pas authorisé à faire cette requête.');
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    res.status(404).send('L\'id n\'a pas été trouvé' + id);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    userRouter.get('/username/:username', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var username, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.params.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!req.user) return [3 /*break*/, 3];
                    return [4 /*yield*/, userService.getByUsername(username)];
                case 2:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 4];
                case 3:
                    res.send('Vous n\'êtes pas authorisé à faire cette requête.');
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_4 = _a.sent();
                    res.send(error_4);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    userRouter.get('/role/:status', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var status, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    status = req.params.status;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!req.user) return [3 /*break*/, 3];
                    return [4 /*yield*/, userService.getByStatus(status)];
                case 2:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 4];
                case 3:
                    res.send('Vous n\'êtes pas authorisé à faire cette requête.');
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_5 = _a.sent();
                    res.status(404).send('Le status n\'a pas été trouvé' + status);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    userRouter.get('/auth/:username', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var username, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = req.params.username;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!req.user) return [3 /*break*/, 3];
                    return [4 /*yield*/, userService.getByUsername(username)];
                case 2:
                    result = _a.sent();
                    res.send(result);
                    return [3 /*break*/, 4];
                case 3:
                    res.send('Vous n\'êtes pas authorisé à faire cette requête.');
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_6 = _a.sent();
                    res.status(404).send(username + 'n\'a pas été trouvé');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    userRouter.post('/', function (req, res) {
        var user = req.body;
        try {
            if (req.user) {
                userService.upload(user);
                res.send(user);
            }
            else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        }
        catch (error) {
            res.send(error);
        }
    });
    userRouter.put('/:id', function (req, res) {
        var id = parseInt(req.params.id, 10);
        var user = req.body;
        try {
            if (req.user) {
                userService.modifyUser(user, id);
                res.send(user);
            }
            else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        }
        catch (error) {
            res.send(error);
        }
    });
    userRouter.put('/picture/:id', function (req, res) {
        var id = parseInt(req.params.id, 10);
        var user = req.body;
        try {
            if (req.user) {
                userService.modifyUserPicture(user, id);
                res.send(user);
            }
            else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        }
        catch (error) {
            res.send(error);
        }
    });
    userRouter.delete('/:id', function (req, res) {
        var id = parseInt(req.params.id, 10);
        try {
            if (req.user) {
                userService.deleteUser(id);
                res.send();
            }
            else {
                res.send('Vous n\'êtes pas authorisé à faire cette requête.');
            }
        }
        catch (error) {
            res.send(error);
        }
    });
    userRouter.get('/user/me', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userService.getById(req.user.id)];
                case 1:
                    user = _a.sent();
                    console.log(req.user);
                    // console.log(user);
                    if (!user) {
                        res.status(400).send('Aucun utilisateur trouvé pour ce token');
                    }
                    res.send(user);
                    return [2 /*return*/];
            }
        });
    }); });
    app.use(environment_1.environment.baseUrl + '/users', userRouter);
};
