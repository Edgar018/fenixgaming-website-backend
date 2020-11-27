import { Document, model, Schema } from "mongoose";

export interface IReplaySchema extends Document {
	file: string;
}

const replaySchema = new Schema({
	file: {
		type: String,
		required: true
	}
});

export default model<IReplaySchema>("Replays", replaySchema);
