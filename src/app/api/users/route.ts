import {NextRequest, NextResponse } from "next/server";
import User from "@/app/Models/User";
import bcrypt from 'bcrypt'


export async function POST(req:NextRequest ) {
    try {
        const body = await req.json()
        const userData = body.formData

        if (!userData.username || !userData.password) {
            return NextResponse.json(
                {message:"Username and password are required"},{
                status:400
            })
        }

        const duplicate = await User.findOne({email:userData.email})
            .lean().exec()

        if (duplicate) {
            return NextResponse.json(
                {message:"Email already used"},{
                status:409
            })
        }

        const hashedPassword = await bcrypt.hash(userData.password,10)

        userData.password = hashedPassword

        await User.create(userData)

        return NextResponse.json(
            {message:"User created"},{
            status:201
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {message:"Error",error},{
            status:500
        })
        
    }
}