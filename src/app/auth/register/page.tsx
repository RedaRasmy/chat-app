'use client'
import MyForm, { SubmitFunction } from "../MyForm";

export default function RegisterForm() {

    const handleRegister:SubmitFunction = async (data,setError) => {
        try {
            const res = await fetch('/api/register',{
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log(res)
            if (res.ok) {
                console.log('res is ok')
                // then i should login
            }
            const js = await res.json()
            if (res.status === 409) {
                setError('username',{
                    message:JSON.parse(js).message
                })
            }
            console.log(js)

        } catch (err) {
            console.log(err)
            if (err instanceof Error) {
                setError('username',{
                    message:err.message
                })
            } else {
                setError("root",{
                    message: "Something went wrong"
                })
            }
        }
    }
    
    return (
        <div className="flex justify-center items-center h-full">
            <MyForm 
                onSubmit={handleRegister}
                buttonText="Register"
            />
        </div>
    )
}