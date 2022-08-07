const { getMessagesFromChat, addMessage } = require("./message.service");

module.exports = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("new-user", async () => {
      io.emit("new-user", members);
    });

    socket.on("join-chat", ({ newChatName, previousChatName }) => {
      socket.join(newChatName);
      socket.leave(previousChatName);
      let roomMessages = getMessagesFromChat(newChatName);
      socket.emit("chat-messages", roomMessages);
    });

    socket.on("typing", (data) => {
      io.emit("typing", data);
    });

    socket.on("stop-typing", (data) => {
      io.emit("stop-typing", data);
    });

    socket.on("message", (data) => {
      addMessage(data);
      let roomMessages = getMessagesFromChat(data.chatName);
      io.to(data.chatName).emit("chat-messages", roomMessages);
      socket.broadcast.emit("notifications", data.chatName);
    });
  });
};
