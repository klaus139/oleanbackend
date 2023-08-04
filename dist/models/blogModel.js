"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blogSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Types.ObjectId, ref: 'user' },
    title: {
        type: String,
        require: true,
        trim: true,
    },
    content: {
        type: String,
        require: true,
    },
    methodology: {
        type: String,
        require: true,
        trim: true,
    },
    slug: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    type: {
        type: String,
        require: true
    },
    pages: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    chapter: {
        type: String,
        require: true,
    },
    // pdf:{
    //   type: String,
    //   required: true
    // },
    category: { type: mongoose_1.default.Types.ObjectId, ref: 'category' },
}, {
    timestamps: true
});
const Blog = mongoose_1.default.model("Blog", blogSchema);
exports.default = Blog;
