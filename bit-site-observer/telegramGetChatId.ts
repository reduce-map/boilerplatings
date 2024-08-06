import axios from 'axios';

const TELEGRAM_BOT_TOKEN = '6810782390:AAH_IuGi4msBOqDCiTISv3fmLVD5TbkbEck';

async function getChatId() {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`;

  try {
    const response = await axios.get(url);
    const updates = response.data.result;

    if (updates.length > 0) {
      console.log(JSON.stringify(updates, null, 2));
      updates.forEach((update: any) => {
        console.log(update.message);
        console.log(update.message.chat.id);
      })
      // const chatId = updates[0]?.message.chat.id;
      // console.log('Chat ID:', chatId);
      // return chatId;
    } else {
      console.log('No updates found. Send a message to your bot or group to get chat_id.');
      return null;
    }
  } catch (error) {
    console.error('Error getting updates:', error);
  }
}

await getChatId();
