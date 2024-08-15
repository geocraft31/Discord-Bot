import Discord = require("discord.js");
import { Bot } from "../../types";

module.exports = {
  name: "minesweeper",
  category: "games",
  permissions: [],
  alias: [],
  description: "Play the game minesweeper",
  example: "minesweeper",
  devOnly: false,
  run: async (bot: Bot, message: Discord.Message, args) => {
    var board = [];
    var numberBombs = 7;

    //creates board
    for (var i = 0; i < 5; i++) {
      board.push([]);
      for (var a = 0; a < 5; a++) {
        board[i].push(0);
      }
    }

    //place bombs
    for (var bomb = 0; bomb < numberBombs; bomb++) {
      var row = Math.round(Math.random() * (board.length - 1));
      var column = Math.round(Math.random() * (board.length - 1));

      while (board[row][column] == "b") {
        var row = Math.round(Math.random() * (board.length - 1));
        var column = Math.round(Math.random() * (board.length - 1));
      }

      board[row][column] = "b";

      //place numbers
      for (var x = row - 1; x <= row + 1; x++) {
        for (var y = column - 1; y <= column + 1; y++) {
          if (
            (x == row && y == column) ||
            x < 0 ||
            y < 0 ||
            x > 4 ||
            y > 4 ||
            board[x][y] == "b"
          ) {
          } else {
            board[x][y] += 1;
          }
        }
      }
    }

    //sending message

    var msg = " There are " + "`" + numberBombs + "`" + " bombs\n";

    for (var row_ in board) {
      for (var column_ in board) {
        if (board[row_][column_] == "b") {
          msg += "||:bomb:|| ";
        } else if (board[row_][column_] == "0") {
          msg += ":zero: ";
        } else if (board[row_][column_] == "1") {
          msg += "||:one:|| ";
        } else if (board[row_][column_] == "2") {
          msg += "||:two:|| ";
        } else if (board[row_][column_] == "3") {
          msg += "||:three:|| ";
        } else if (board[row_][column_] == "4") {
          msg += "||:four:|| ";
        } else if (board[row_][column_] == "5") {
          msg += "||:five:|| ";
        } else if (board[row_][column_] == "6") {
          msg += "||:six:|| ";
        } else if (board[row_][column_] == "7") {
          msg += "||:seven:|| ";
        } else if (board[row_][column_] == "8") {
          msg += "||:eight:|| ";
        }
      }
      msg += "\n";
    }

    message.channel.send(msg);
  },
};
