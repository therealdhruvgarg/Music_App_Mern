import { usermodel } from "../db/schema/schema.js";
export const userController = {
    login(request,respose){
        const userInfo = request.body;
       // eslint-disable-next-line no-cond-assign
       if(userInfo.userid = userInfo.password){
        respose.json({message:'welcome'+ userInfo.userid});
       }else{
        respose.json({message:'INVALID'})
       }
        // console.log('request body is',body);
        respose.json({message:'Login'})
    },
    async register(request,respose){
        const userInfo =request.body;
        try{
        const doc = await usermodel.create(userInfo);
        if(doc && doc._id){
        respose.json({message:'Register Successful'});
        }else{
            respose.json({message:'Unsuccessful'});
        }
       
        } 
        catch(err){
            console.log('Register Error ', err)};
            respose.json({message:'Unsuccessful'});
    },
    profile(request,respose){
        const userName  = request.params.username;
        console.log('All params',userName)
        respose.json({message:userName+' Profile'})
    },
    changePassword(request,respose){
        respose.json({message:'ChangePassword'})
    }
}