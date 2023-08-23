export const userController = {
    login(request,respose){
        const body = request.body;
        console.log('request body is',body);
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