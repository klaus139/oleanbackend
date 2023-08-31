"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
const socket_1 = require("./config/socket");
//import routes
const index_1 = __importDefault(require("./routes/index"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
//middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
}));
//socket.io
const http = (0, http_1.createServer)(app);
exports.io = new socket_io_1.Server(http);
exports.io.on("connection", (socket) => (0, socket_1.SocketServer)(socket));
//routes
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
app.use('/api', index_1.default);
//connect database
(0, database_1.default)();
//production
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../../client', 'build', 'index.html'));
    });
}
// server listening
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log(`Server is running on port`, PORT);
});
