import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add ypur category"],
        trim: true,
        unique: true,
        maxLength: [50, "Name is up to 50 chars long"],
    }


},{
    timestamps: true
})

const Category:any = mongoose.model("Category", categorySchema);
export default Category;