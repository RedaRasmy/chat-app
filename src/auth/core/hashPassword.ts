import crypto from 'crypto'

export function hashPassword(password:string, salt : string):Promise<string> {
    return new Promise((res,rej)=> {
        crypto.scrypt(password.normalize(), salt , 64 , (err,hash) => {
            if (err) rej(err);
            res(hash.toString('hex').normalize())
        })
    })

}   

export function generateSalt() {
    return crypto.randomBytes(16).toString('hex').normalize()
}