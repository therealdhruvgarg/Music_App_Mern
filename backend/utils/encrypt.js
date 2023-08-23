import bcrypt from 'bcrypt';
export const hashing = {
    SALT : 10,
    passwordHash(plainPwd){
        bcrypt.hashSync(plainPwd,this.SALT);
    }
}