import bcrypt from 'bcrypt';

export const hashing = {
    SALT: process.env.BCRYPT_SALT || 10, // Use environment variable or default to 10
    passwordHash(plainPwd) {
        try {
            return bcrypt.hashSync(plainPwd, this.SALT);
        } catch (error) {
            console.error('Error hashing password:', error);
            throw new Error('Password hashing error');
        }
    },
    matchpassword(plainpwd, dbpwd) {
        try {
            return bcrypt.compareSync(plainpwd, dbpwd);
        } catch (error) {
            console.error('Error comparing passwords:', error);
            throw new Error('Password comparison error');
        }
    }
};
