import { Request, Response } from "express";
import Comment from "../../models/comment.model";

export default async (req: Request, res: Response) => {
	try {
		const commentsFound = await Comment.findById(req.params.id);
		res.status(200).json({ msg: commentsFound });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ msg: "Internal Server Error" });
	}
};
