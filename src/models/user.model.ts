import { model, Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	roles: string[];
	comparePassword: (password: string) => Promise<boolean>;
}

const userSchama = new Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	roles: {
		type: Schema.Types.ObjectId,
		ref: "roles"
	}
});

userSchama.pre<IUser>("save", async function(next) {
	const user = this;
	if (!user.isModified("password")) return next();

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	this.password = hash;
	next();
});

userSchama.methods.comparePassword = async function(password: string): Promise<Boolean> {
	return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User", userSchama);
