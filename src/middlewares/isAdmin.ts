import User from "../models/user.model";
import Roles from "../models/roles.model";
import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userFound = await User.findOne({ _id: req.userId });
		const roles = await Roles.find({ _id: { $in: userFound?.roles } });

		for (let index in roles) {
			if (roles[index].name === "admin") {
				return next();
			}
		}

		res.status(400).json("Require admin role");
		throw new Error("Require admin role");
	} catch (err) {
		console.error(err);
	}
};
