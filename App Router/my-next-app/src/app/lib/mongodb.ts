import mongoose from "mongoose"

const MONGODB_URI="mongodb://127.0.0.1:27017/ecommerce";

if(!MONGODB_URI){
    throw new Error("no mogonodb string is provided")
};

export async function connectDB(){
   try{
    await mongoose.connect(MONGODB_URI);
    console.log("mongodb connected succesfully");
   }catch(err){
    console.log("somethig went wrong",err);
   }
}