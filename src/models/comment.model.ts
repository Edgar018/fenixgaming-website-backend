import { Document, model, Schema } from "mongoose";

export interface IComment extends Document {
	writer: string;
	articleId: string;
	content: string;
}

const commentSchema = new Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		articleId: {
			type: Schema.Types.ObjectId,
			ref: "Article"
		},
		content: {
			required: true,
			type: String
		}
	},
	{ timestamps: true }
);

export default model<IComment>("Comment", commentSchema);
