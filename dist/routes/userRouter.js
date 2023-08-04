"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const userCtrl_1 = __importDefault(require("../controller/userCtrl"));
const paymentCtrl_1 = __importDefault(require("../controller/paymentCtrl"));
//import { sendMessage } from '../config/sendSMS';
const router = express_1.default.Router();
router.patch('/user', auth_1.default, userCtrl_1.default.updateUser);
router.patch('/reset-password', auth_1.default, userCtrl_1.default.resetPassword);
router.patch('/user/:id', userCtrl_1.default.getUser);
router.get('/users', userCtrl_1.default.getAllUsers);
//payment routes
router.post('/payment-details', paymentCtrl_1.default.register);
router.get('/payment-users', paymentCtrl_1.default.getAllPayers);
exports.default = router;
