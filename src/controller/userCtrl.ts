import { Request, Response} from 'express';
import { IReqAuth } from '../config/interface';
import User from '../models/userModel';
import bcrypt from 'bcrypt';

const userCtrl = {
    updateUser: async(req:IReqAuth, res:Response) => {
        if(!req.user) return res.status(400).json({msg: 'Invalid Authentication'})
        try{
            const {avatar, name} = req.body
           await User.findOneAndUpdate({_id: req.user._id}, {
                avatar, name
            })
           
            res.json({msg: 'Update Success!'})
            console.log(req.user)
        }catch(err:any){
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async(req:IReqAuth, res:Response) => {
        if(!req.user) return res.status(400).json({msg: 'Invalid Authentication'})
        try{
            const {password} = req.body
            const passwordHash = await bcrypt.hash(password, 12)
           await User.findOneAndUpdate({_id: req.user._id}, {
                password: passwordHash
            })
           
            res.json({msg: 'Reset Password Success!'})
            console.log(req.user)
        }catch(err:any){
            return res.status(500).json({msg: err.message})
        }
    },
    getUser: async (req: Request, res: Response) => {
        try{
            const user = await User.findById(req.params.id).select('-password')
            if(!user) return res.status(400).json({msg: 'User does not exist.'})
            res.json(user)

        }catch(err: any){
            return res.status(500).json({msg: err.message})
        }
    },
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await User.find().select('-password');
            res.json(users);
        } catch (err: any) {
            return res.status(500).json({msg: err.message});
        }
    }

}

export default userCtrl;