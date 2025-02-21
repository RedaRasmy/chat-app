'use client'
import MyForm, { SubmitFunction } from "../MyForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter()
    
    const handleLogin: SubmitFunction = async (data,setError) => {
        try {
            const res = await signIn('credentials')
            if (res?.error) {
                setError('root',{message:res.error})
                return
            }
            // router.replace('/')
        } catch (error) {
            if (error instanceof Error) {
                setError('root',{message:error.message})
            }else {
                setError('root',{message:'Something went wrong'})
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-full">
            <MyForm 
                onSubmit={handleLogin}
                buttonText="Login"
            />
        </div>
    )
}
