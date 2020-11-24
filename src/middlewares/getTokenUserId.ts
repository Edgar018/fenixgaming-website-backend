import jwt from "jsonwebtoken";
import User from "../models/user.model";
import config from "../config/config";
import { Request, Response, NextFunction } from "express";

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

export default async (req: Request, res: Response, next: NextFunction) => {
	try {
		let token: any = req.header("authorization");

		if (!token) {
			res.status(403).json({ msg: "no token provided" });
			throw new Error("no token provided");
		}

		token = token.split(" ");

		const decoded = <any>jwt.verify(token[1], config.jwtSecret);
		req.userId = decoded.id;

		const userFound = await User.findById(req.userId, { password: 0 });

		if (!userFound) {
			res.status(404).json("no user found");
			throw new Error("no user found");
		}

		next();
	} catch (err) {
		console.error(err);
	}
};
