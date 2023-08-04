import mongoose from 'mongoose'
import { IPayment } from '../config/interface'



const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
   
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
}, {
    timestamps: true
})

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
export default Payment;