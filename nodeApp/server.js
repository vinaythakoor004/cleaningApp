const http = require("http");
const { Server } = require("socket.io");
const app = require("./app"); // Now uses Express app with routes

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4300",
    methods: ["GET", "POST"],
    credentials: true
  },
  path: "/socket.io"
});

io.on("connection", (socket) => {
  console.log("🔌 WebSocket connected:", socket.id);
});

app.set("io", io);

server.listen(3001, () => {
  console.log("✅ Server running on port 3001");
});
