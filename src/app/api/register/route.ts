import User from "@/app/Models/User";
import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(req:NextRequest) {

    try {
        const {password,username} = await req.json()

        console.log(username,password)

        const hashedPassword = await bcrypt.hash(password,10)

        await connectMongoDB()

        const foundUser = await User.findOne({username})

        if (foundUser) {
            return NextResponse.json({message:'Username already used'},{status:409})
        }

        await User.create({
            username,
            password : hashedPassword
        })

        return NextResponse.json({message:"User registered"},{status:201})
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({message:err.message},{status:409})
        } 
        return NextResponse.json({message:"Something went wrong"})
    }
    
}