import { Schema, Document, model } from "mongoose";

export interface IRoleSchema extends Document {
	name: string;
}

const roleSchema = new Schema(
	{
		name: String
	},
	{ versionKey: false }
);

export default model<IRoleSchema>("roles", roleSchema);
