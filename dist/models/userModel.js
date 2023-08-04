"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: [30, "Your name is up to 30 chars long."]
    },
    account: {
        type: String,
        required: [true, "Please add your email or phone"],
        trim: true,
        unique: true
    },
    number: {
        type: Number,
        required: [true, "Please add your phone number"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
        trim: true,
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    },
    role: {
        type: String,
        default: 'user' // admin 
    },
    type: {
        type: String,
        default: 'register' // fast
    },
    rf_token: { type: String, select: false }
}, {
    timestamps: true
});
const User = mongoose_1.default.model('user', userSchema);
exports.default = User;
