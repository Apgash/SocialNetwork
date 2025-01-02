"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const thoughtRoutes_1 = __importDefault(require("./routes/thoughtRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use('/api/users', userRoutes_1.default);
app.use('/api/thoughts', thoughtRoutes_1.default);
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('MongoDB connected');
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
});
exports.default = app;
