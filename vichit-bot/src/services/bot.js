import { Telegraf } from "telegraf";
import { BOT_ID, BOT_SEND_INFO } from "../../config/constants";

export const bot = new Telegraf(BOT_ID);

const sendFile = (id, file) => {
  bot.telegram
    .sendDocument(id, {
      source: file.path,
      filename: file.name,
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const sendMessage = (option, file = null) => {
  BOT_SEND_INFO.forEach((id) => {
    bot.telegram.sendMessage(id, option);
    if (file) sendFile(id, file);
  });
};
