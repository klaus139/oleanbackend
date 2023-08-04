import {Request, Response} from 'express';
import Payment from '../models/paymentModel';
import { validateEmail, validPhone } from '../middleware/valid';

const paymentCtrl = {
    register: async(req: Request, res: Response) => {
        try{
            const { name, email, phone, sex, country} = req.body;

            const newPayer = {name, email, phone}

            if(validateEmail(email)){
                const payerToSave = new Payment(newPayer)
                await payerToSave.save()
                return res.json({msg: 'details saved successfully'})
            }
            console.log(newPayer)
       
            
        

        }catch(err:any){
            return res.status(500).json({msg: err.message})
        }
    },
    getAllPayers: async(req:Request, res: Response) => {
        try{
            const payers = await Payment.find()
            res.json({payers})
        }catch(err: any){
            return res.status(500).json({msg: err.message})
        }
    }
}

export default paymentCtrl;