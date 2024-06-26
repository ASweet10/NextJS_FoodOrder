import { Schema, model, models } from "mongoose"
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    zipCode: { type: String },
    city: { type: String },
    usState: { type: String },
    admin: { type: Boolean, default: false },
}, {timestamps: true})

export const User = models?.User || model('User', UserSchema)