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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
module.exports = {
    name: "minesweeper",
    category: "games",
    permissions: [],
    alias: [],
    description: "Play the game minesweeper",
    example: "minesweeper",
    devOnly: false,
    run: function (bot, message, args) { return __awaiter(void 0, void 0, void 0, function () {
        var board, numberBombs, i, a, bomb, row, column, row, column, x, y, msg, row_, column_;
        return __generator(this, function (_a) {
            board = [];
            numberBombs = 7;
            for (i = 0; i < 5; i++) {
                board.push([]);
                for (a = 0; a < 5; a++) {
                    board[i].push(0);
                }
            }
            for (bomb = 0; bomb < numberBombs; bomb++) {
                row = Math.round(Math.random() * (board.length - 1));
                column = Math.round(Math.random() * (board.length - 1));
                while (board[row][column] == "b") {
                    row = Math.round(Math.random() * (board.length - 1));
                    column = Math.round(Math.random() * (board.length - 1));
                }
                board[row][column] = "b";
                for (x = row - 1; x <= row + 1; x++) {
                    for (y = column - 1; y <= column + 1; y++) {
                        if ((x == row && y == column) ||
                            x < 0 ||
                            y < 0 ||
                            x > 4 ||
                            y > 4 ||
                            board[x][y] == "b") {
                        }
                        else {
                            board[x][y] += 1;
                        }
                    }
                }
            }
            msg = " There are " + "`" + numberBombs + "`" + " bombs\n";
            for (row_ in board) {
                for (column_ in board) {
                    if (board[row_][column_] == "b") {
                        msg += "||:bomb:|| ";
                    }
                    else if (board[row_][column_] == "0") {
                        msg += ":zero: ";
                    }
                    else if (board[row_][column_] == "1") {
                        msg += "||:one:|| ";
                    }
                    else if (board[row_][column_] == "2") {
                        msg += "||:two:|| ";
                    }
                    else if (board[row_][column_] == "3") {
                        msg += "||:three:|| ";
                    }
                    else if (board[row_][column_] == "4") {
                        msg += "||:four:|| ";
                    }
                    else if (board[row_][column_] == "5") {
                        msg += "||:five:|| ";
                    }
                    else if (board[row_][column_] == "6") {
                        msg += "||:six:|| ";
                    }
                    else if (board[row_][column_] == "7") {
                        msg += "||:seven:|| ";
                    }
                    else if (board[row_][column_] == "8") {
                        msg += "||:eight:|| ";
                    }
                }
                msg += "\n";
            }
            message.channel.send(msg);
            return [2];
        });
    }); },
};
