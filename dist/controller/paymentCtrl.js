"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const valid_1 = require("../middleware/valid");
const paymentCtrl = {
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, phone, sex, country } = req.body;
            const newPayer = { name, email, phone };
            if ((0, valid_1.validateEmail)(email)) {
                const payerToSave = new paymentModel_1.default(newPayer);
                yield payerToSave.save();
                return res.json({ msg: 'details saved successfully' });
            }
            console.log(newPayer);
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }),
    getAllPayers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payers = yield paymentModel_1.default.find();
            res.json({ payers });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    })
};
exports.default = paymentCtrl;
