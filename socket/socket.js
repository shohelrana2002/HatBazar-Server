const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(" User Connected:", socket.id);

    socket.on("join", (email) => {
      socket.join(email);
      console.log(`${email} joined room`);
    });

    socket.on("disconnect", () => {
      console.log(" User Disconnected:", socket.id);
    });
  });
};

export default socketHandler;
