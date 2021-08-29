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
var express_1 = __importDefault(require("express"));
var auth_service_1 = require("../services/auth.service");
var jwt = require("express-jwt");
var environment_1 = require("../environment");
exports.AuthController = function (app) {
    var authService = new auth_service_1.AuthService();
    var authRouter = express_1.default.Router();
    authRouter.get('/', function (req, res) {
        res.send('Hello auth');
    });
    authRouter.post('/signin', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userB, _a, token, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userB = req.body;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authService.signIn(userB.username, userB.pwd)];
                case 2:
                    _a = _b.sent(), token = _a.token, user = _a.user;
                    res.set('access-control-expose-headers', 'JWT-TOKEN');
                    res.set('JWT-TOKEN', token);
                    user.pwd = 'null';
                    res.send(user);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    console.log(error_1);
                    res.status(400).send('L\'email ou le mot de passe est erroné');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    if (environment_1.environment.JWT_SECRET) {
        authRouter.use(jwt({ secret: environment_1.environment.JWT_SECRET }));
    }
    else {
        throw new Error('Secret is not defined');
    }
    authRouter.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userTosign, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userTosign = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!(req.user.status === 'admin' || req.user.status === 'superAdmin')) return [3 /*break*/, 3];
                    return [4 /*yield*/, authService.signUp(userTosign)];
                case 2:
                    _a.sent();
                    res.send('Record Ok');
                    return [3 /*break*/, 4];
                case 3:
                    res.send('Vous n\'êtes pas authorisé à faire cette requête.');
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    res.status(409).send('Impossible d\'enregistrer cet utilisateur');
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); });
    authRouter.put('/pwd', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var user, pwd, newPwd, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = req.body.user;
                    pwd = req.body.pwd;
                    newPwd = req.body.newPwd;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authService.changePwd(user, pwd, newPwd)];
                case 2:
                    result = _a.sent();
                    res.send(JSON.stringify(result));
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.status(409).send('pb');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    app.use(environment_1.environment.baseUrl + '/auth', authRouter);
};
