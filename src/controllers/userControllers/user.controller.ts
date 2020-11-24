import { Request, Response } from "express";
import User, { IUser } from "../../models/user.model";
import jwt from "jsonwebtoken";
import config from "../../config/config";

const createToken = (user: IUser) => {
	return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
		expiresIn: 86400
	});
};

export const signUp = async (req: Request, res: Response): Promise<Response | undefined> => {
	try {
		if (!req.body.email || !req.body.password || !req.body.username) {
			res.status(400).json({ msg: "Please send your email, password and username" });
			throw new Error("password, email and password no found");
		}
		const userFound = await User.findOne({ email: req.body.email });
		if (userFound) {
			res.status(400).json({ msg: "the user already exists" });
			throw new Error("the user already exists");
		}
		const newUser = new User(req.body);
		await newUser.save();
		return res.status(201).json({ msg: "The user was created successfully" });
	} catch (err) {
		console.error(err.message);
	}
};

export const signIn = async (req: Request, res: Response) => {
	try {
		if (!req.body.email || !req.body.password) {
			res.status(400).json({ msg: "Please send your email and password" });
			throw new Error("Please send your email and password");
		}

		const userFound = await User.findOne({ email: req.body.email });
		if (!userFound) {
			res.status(404).json("the user does not exists");
			throw new Error("the user does not exists");
		}
		const isMatch = await userFound.comparePassword(req.body.password);
		if (isMatch) {
			return res.status(201).json({ msg: createToken(userFound) });
		}
		res.status(400).json({ msg: "the email or password is incorrect" });
		throw new Error("the email or password is incorrect");
	} catch (err) {
		console.error(err.message);
	}
};
