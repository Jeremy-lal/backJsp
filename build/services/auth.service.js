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
var user_service_1 = require("./user.service");
var user_repository_1 = require("./../repository/user.repository");
var note_repository_1 = require("./../repository/note.repository");
var token_service_1 = require("./token.service");
var token_1 = require("../models/token");
var jsonwebtoken_1 = require("jsonwebtoken");
var crypto_1 = require("crypto");
var bcrypt_1 = __importDefault(require("bcrypt"));
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.repository = new user_repository_1.UserRepository();
        this.repositoryNote = new note_repository_1.NoteRepository();
        this.tokenService = new token_service_1.TokenService();
        this.userService = new user_service_1.UserService();
    }
    AuthService.prototype.signUp = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var username, _a, all, tokenString, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.repository.findByUsername(user.username)];
                    case 1:
                        username = _b.sent();
                        if (!(username == null || undefined)) return [3 /*break*/, 5];
                        _a = user;
                        return [4 /*yield*/, bcrypt_1.default.hashSync(user.pwd, 10)];
                    case 2:
                        _a.pwd = _b.sent();
                        crypto_1.randomBytes(12).toString('hex');
                        return [4 /*yield*/, this.repository.save(user)];
                    case 3:
                        all = _b.sent();
                        tokenString = crypto_1.randomBytes(12).toString('hex');
                        token = new token_1.Token({ user_id: all.insertId, value: tokenString });
                        return [4 /*yield*/, this.tokenService.create(token)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5: throw new Error('Mail already used ');
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.signIn = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            var labelError, user, _a, error_1, isValid, secret1, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        labelError = new Error('Invalide crendentials');
                        return [4 /*yield*/, this.repository.findByUsername(username)];
                    case 1:
                        user = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        _a = user;
                        return [4 /*yield*/, this.repositoryNote.findByUserId(user.id)];
                    case 3:
                        _a.note = (_b.sent());
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5:
                        if (!user) {
                            throw new Error('NOT ACTIVE');
                        }
                        if (!user) {
                            throw labelError;
                        }
                        return [4 /*yield*/, bcrypt_1.default.compareSync(password, user.pwd)];
                    case 6:
                        isValid = _b.sent();
                        if (!isValid) {
                            throw labelError;
                        }
                        secret1 = environment_1.environment.JWT_SECRET;
                        if (!secret1) {
                            throw new Error('Pas de secret SETUP');
                        }
                        token = jsonwebtoken_1.sign({ id: user.id, username: user.username, status: user.status }, secret1);
                        return [2 /*return*/, { token: token, user: user }];
                }
            });
        });
    };
    AuthService.prototype.changePwd = function (userPass, pwd, newPwd) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValid, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.repository.findByUsername(userPass.username)];
                    case 1:
                        user = _b.sent();
                        if (pwd === newPwd) {
                            return [2 /*return*/, 'Mot de passe actuel et nouveau identique'];
                        }
                        if (!user) return [3 /*break*/, 6];
                        return [4 /*yield*/, bcrypt_1.default.compareSync(pwd, user.pwd)];
                    case 2:
                        isValid = _b.sent();
                        if (!isValid) return [3 /*break*/, 4];
                        _a = user;
                        return [4 /*yield*/, bcrypt_1.default.hashSync(newPwd, 10)];
                    case 3:
                        _a.pwd = _b.sent();
                        this.repository.changePwd(user, user.id);
                        return [2 /*return*/, 'Mot de passe bien changé.'];
                    case 4: return [2 /*return*/, 'Mot de passe actuel erroné.'];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, 'Utilisateur non valide.'];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.refreshPwd = function (userPass, newPwd) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.repository.findByUsername(userPass.username)];
                    case 1:
                        user = _b.sent();
                        if (!user) return [3 /*break*/, 3];
                        _a = user;
                        return [4 /*yield*/, bcrypt_1.default.hashSync(newPwd, 10)];
                    case 2:
                        _a.pwd = _b.sent();
                        this.repository.changePwd(user, user.id);
                        return [2 /*return*/, 'Mot de passe bien changé.'];
                    case 3: return [2 /*return*/, 'Mot de passe actuel erroné.'];
                }
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
