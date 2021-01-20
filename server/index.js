const io = require("socket.io")(8000, {
  cors: {
    origin: "http://192.168.1.4:3000",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  socket.on("new-user-joined", (name) => {
    console.log(`${name} connected`);
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });
  socket.on("send-message", (message) => {
    console.log(`${socket.id} said ${message}`);
    socket.broadcast.emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", (reason) => {
    console.log(`${users[socket.id]}/${socket.id} disconnected`);
    socket.broadcast.emit("user-disconnected", users[socket.id]);
    delete users[socket.id];
  });
});
