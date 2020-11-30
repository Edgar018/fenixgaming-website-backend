import { Request, Response } from "express";
import Comment from "../../../models/comment.model";

export default async (req: Request, res: Response) => {
	try {
		await Comment.findByIdAndUpdate(req.params.id, req.body);
		return res.status(200).json({ msg: "user updated successfully" });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ msg: "Internal Server Error" });
	}
};
