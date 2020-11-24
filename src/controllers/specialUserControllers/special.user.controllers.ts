import { Request, Response } from "express";
import User from "../../models/user.model";
import Roles from "../../models/roles.model";

export const createUserAdmin = async (req: Request, res: Response) => {
	try {
		if (!req.body.email || !req.body.password || !req.body.username) {
			res.status(400).json({ msg: "Please send your email, password and username" });
			throw new Error("password, email and password no found");
		}
		const userFound = await User.findOne({ email: req.body.email });

		userFound;
		if (userFound) {
			res.status(400).json({ msg: "the user already exists" });
			throw new Error("the user already exists");
		}
		const newUser = new User(req.body);
		const rolesFound = await Roles.findOne({ name: "admin" });
		newUser.roles = [rolesFound?._id];
		await newUser.save();
		return res.status(201).json({ msg: "The user was created successfully" });
	} catch (err) {
		console.error(err.message);
	}
};
