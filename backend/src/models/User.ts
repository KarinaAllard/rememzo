import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    email: string;
    passwordHash: string;
    streak: number;
    preferences: {
        language: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    streak: { type: Number, default: 0 },
    preferences: {
        language: { type: String, default: "en" }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, 
{ collection: "users" }
);

export default mongoose.model<IUser>("User", UserSchema);