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
    register(request,respose){
        respose.json({message:'Register'})
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