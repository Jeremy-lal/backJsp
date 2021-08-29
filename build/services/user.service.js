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
Object.defineProperty(exports, "__esModule", { value: true });
var user_repository_1 = require("../repository/user.repository");
var note_repository_1 = require("../repository/note.repository");
var UserService = /** @class */ (function () {
    function UserService() {
        this.repository = new user_repository_1.UserRepository();
        this.repositoryNote = new note_repository_1.NoteRepository();
    }
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var all, i, _a, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.repository.findAll()];
                    case 1:
                        all = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < all.length)) return [3 /*break*/, 6];
                        _a = all[i];
                        return [4 /*yield*/, this.repositoryNote.findByUserId(all[i].id)];
                    case 4:
                        _a.note = (_b.sent());
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, all];
                }
            });
        });
    };
    UserService.prototype.getAllByGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersBygroup, status, i, _a, _b, _i, _c, user, _d, error_2;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        usersBygroup = {};
                        status = ['Jsp1', 'Jsp2', 'Jsp3', 'Jsp4', 'admin', 'superAdmin'];
                        i = 0;
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 9, , 10]);
                        i = 0;
                        _e.label = 2;
                    case 2:
                        if (!(i < status.length)) return [3 /*break*/, 8];
                        _a = usersBygroup;
                        _b = status[i];
                        return [4 /*yield*/, this.repository.findByStatus(status[i])];
                    case 3:
                        (_a[_b] = _e.sent());
                        _i = 0, _c = usersBygroup[status[i]];
                        _e.label = 4;
                    case 4:
                        if (!(_i < _c.length)) return [3 /*break*/, 7];
                        user = _c[_i];
                        _d = user;
                        return [4 /*yield*/, this.repositoryNote.findByUserId(user.id)];
                    case 5:
                        _d.note = (_e.sent());
                        _e.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        i++;
                        return [3 /*break*/, 2];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        error_2 = _e.sent();
                        console.log(error_2);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/, usersBygroup];
                }
            });
        });
    };
    UserService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!Number.isInteger(id)) {
                            throw new Error('error');
                        }
                        return [4 /*yield*/, this.repository.findById(id)];
                    case 1:
                        user = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        if (!user) return [3 /*break*/, 4];
                        _a = user;
                        return [4 /*yield*/, this.repositoryNote.findByUserId(id)];
                    case 3:
                        _a.note = (_b.sent());
                        return [2 /*return*/, user];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _b.sent();
                        return [2 /*return*/, error_3];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getByStatus = function (status) {
        return __awaiter(this, void 0, void 0, function () {
            var all, i, _a, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.repository.findByStatus(status)];
                    case 1:
                        all = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < all.length)) return [3 /*break*/, 6];
                        _a = all[i];
                        return [4 /*yield*/, this.repositoryNote.findByUserId(all[i].id)];
                    case 4:
                        _a.note = (_b.sent());
                        _b.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _b.sent();
                        console.log(error_4);
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/, all];
                }
            });
        });
    };
    UserService.prototype.getByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findByUsername(username)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.upload = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.save(user)];
            });
        });
    };
    UserService.prototype.modifyUser = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.modify(user, id)];
            });
        });
    };
    UserService.prototype.modifyUserPicture = function (user, id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.changePicture(user, id)];
            });
        });
    };
    UserService.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.repository.delete(id)];
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
