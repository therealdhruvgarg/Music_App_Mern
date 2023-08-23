import bcrypt from 'bcrypt';
export const hashing = {
    SALT : 10,
    passwordHash(plainPwd){
        return bcrypt.hashSync(plainPwd,this.SALT);
    },
    matchpassword(plainpwd,dbpwd){
        return bcrypt.compareSync(plainpwd,dbpwd)
    }
}