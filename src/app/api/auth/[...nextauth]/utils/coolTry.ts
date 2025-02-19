
type Try<T> = [ T  , null] | [null , Error]

export default async function coolTry<T>(promise:Promise<T>):Promise<Try<T>>{
    try {
        const res = await promise
        return [res, null]
    } catch (error) {
        if (error instanceof Error) {
            return [null , error]
        } else {
            if (typeof error === 'string') {

                return [null, {message:error} as Error]
            }
            return [null, {message : "Unkown Error"} as Error]
        }
    }
}
