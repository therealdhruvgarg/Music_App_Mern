export const userController = {
    login(request,respose){
        respose.json({message:'Login'})
    },
    register(request,respose){
        respose.json({message:'Register'})
    },
    profile(request,respose){
        respose.json({message:'Profile'})
    },
    changePassword(request,respose){
        respose.json({message:'ChangePassword'})
    }
}