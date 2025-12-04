import mongoose, { Document, Schema } from "mongoose";

export interface IItem extends Document {
    name: string;
    type: string;
    variations: string[];
    states: string[];
    artRef: string[];
    translations?: Record<string, string>;
}

const ItemSchema: Schema<IItem> = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    variations: { type: [String], default: [] },
    states: { type: [String], default: [] },
    artRef: { type: [String], default: [] },
    translations: { type: Map, of: String }
});

export default mongoose.model<IItem>("itemslibrary", ItemSchema);