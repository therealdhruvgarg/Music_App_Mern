import mongoose from "mongoose";
const url = 'mongodb+srv://admin:admin123@cluster0.1ldweh5.mongodb.net/userdb?retryWrites=true&w=majority';
const promise = mongoose.connect(url);
promise.then(data=>{
    console.log('DB COnnected...');
}).catch(err=>{
    console.log('Error during DB Connection',err);
})
export default mongoose;
