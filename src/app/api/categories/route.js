import { Category } from "@/models/category"
import mongoose from "mongoose"
import { isAdmin } from "../auth/[...nextauth]/route"

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    return Response.json(
        await Category.find() // Find all categories
    )
}

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL)
    const { name, index } = await req.json()
    if (await isAdmin()) {
        const categoryDoc = await Category.create({name, index})
        return Response.json(categoryDoc)
    } else {
        return Response.json({})
    }
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL)
    const {_id, name, index} = await req.json()
    if (await isAdmin()) {
        await Category.updateOne({_id}, {name, index}) // Update document with this id; Change name
    }    
    return Response.json(true)
}



export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL)
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')

    if(await isAdmin()) {
        await Category.deleteOne({_id}) // Delete document (category) with this id
    }
    return Response.json(true)
}