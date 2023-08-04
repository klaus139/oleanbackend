import mongoose from 'mongoose'
import { IBlog } from '../config/interface'

const blogSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'user' },
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
  slug:{
    type:String,
  },
  thumbnail:{
    type: String,
  
  },
  type:{
    type: String,
    require: true
  },
  pages: {
    type: String,
    require: true
  },
  price:{
    type: String,
    require: true
  },
  chapter:{
    type: String,
    require: true,
  },
  // pdf:{
  //   type: String,
  //   required: true
  // },
  category: { type: mongoose.Types.ObjectId, ref: 'category' },

}, {
  timestamps: true
})


const Blog =  mongoose.model<IBlog>("Blog", blogSchema);
export default Blog;
