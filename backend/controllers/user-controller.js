import { usermodel } from "../db/schema/schema.js";
import { hashing } from "../utils/encrypt.js";
export const userController = {
    login(request,respose){
        const userInfo = request.body;
        const doc = usermodel.findOne({'email':userInfo.email}).exec();
        if(doc&&doc._id){
            const plainPassword = userInfo.password;
            const dbpassword = doc.password;
            if(hashing.matchpassword(plainPassword,dbpassword)){
                respose.json({message:"Welsome "+doc.name})
            }else{
                respose.json({message:"INVALID USERID ORhPASSWORD"});
            }
        }else{
            respose.json({message:"INVALID USERID OR PASSWORD"});
        }
    },
    async register(request,respose){
        const userInfo =request.body;
        userInfo.password = hashing.passwordHash(userInfo.password)
        try{
        const doc = await usermodel.create(userInfo);
        if(doc && doc._id){
        respose.json({message:"'Register Successful'"});
        }else{
            respose.json({message:"'Unsuccessful'"});
        }
       
        } 
        catch(err){
            console.log('Register Error ', err)};
            respose.json({message:"'ERRUnsuccessful'"});
    },
    profile(request,respose){
        const userName  = request.params.username;
        console.log('All params',userName)
        respose.json({message:userName+"' Profile'"})
    },
    changePassword(request,respose){
        respose.json({message:"'ChangePassword'"})
    }
}