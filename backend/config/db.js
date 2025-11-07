import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Tiendat29:tiendat123@cluster0.sas3fpc.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}