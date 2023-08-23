import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
    'email':{type:mongoose.SchemaType.string,required:true,unique:true},
    'password':{type:mongoose.SchemaType.string,required:true,minLength:8,maxLength:25},
    'name':{type:mongoose.SchemaType.string,required:true},
    'phone':{type:mongoose.SchemaType.string}
});
export const usermodel = mongoose.model('user',userSchema);

