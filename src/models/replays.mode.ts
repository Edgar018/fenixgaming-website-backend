import { Document, model, Schema } from "mongoose";

export interface IReplaySchema extends Document {
  playerOne: object;
  playerTwo: object;
  matchup: string;
  chat: Array<object>;
  version: string;
  duration: number;
	path: string;
}

const replaySchema = new Schema({
	playerOne: {
		type: Object,
		required: true
	},
	playerTwo: {
		type: Object,
		required: true
	},
	matchup: {
		type: String,
		required: true
	},
	chat: {
		type: Array,
		required: true
	},
	version: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	path: {
		type: String,
		required: true
	}
});

export default model<IReplaySchema>("Replays", replaySchema);
