const fs = require("fs");
const chatMessages = require("./messages.json");

function getChatName(name, memberName) {
  const data = [name, memberName].sort((a, b) => a.localeCompare(b));
  const chatName = data.map((item) => item.toLowerCase()).join("-");
  return chatName;
}

const persons = [
  "eddy",
  "shakil",
  "dilshad",
  "partha",
  "abhay",
  "deepak",
  "prince",
];

const newMessages = chatMessages.map((message) => {
  const maxSenderIndex = persons.length - 1;
  const maxReceiverIndex = persons.length - 2;
  sender = persons[Math.ceil(Math.random() * maxSenderIndex)];
  const receivers = persons.filter((person) => person != sender);
  receiver = receivers[Math.ceil(Math.random() * maxReceiverIndex)];
  return {
    id: message.id,
    sender,
    receiver,
    time: message.time,
    content: message.content,
    chatName: getChatName(sender, receiver),
  };
});

fs.writeFile(
  "./chat-messages.json",
  JSON.stringify(newMessages, null, 4),
  () => {}
);
