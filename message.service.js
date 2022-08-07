const fs = require("fs").promises;
const { v4: uuidV4 } = require("uuid");
const chatMessages = require("./chat-messages.json");

function getMessagesFromChat(chatName) {
  return chatMessages.filter((item) => item.chatName == chatName);
}

async function addMessage({ sender, receiver, content, time, chatName }) {
  chatMessages.push({
    id: uuidV4(),
    sender,
    receiver,
    content,
    time,
    chatName,
  });
  await fs.writeFile(
    "./chat-messages.json",
    JSON.stringify(chatMessages, null, 4)
  );
}

module.exports = {
  getMessagesFromChat,
  addMessage,
};
