import { Request, Response } from "express";
import Comment from "../../../models/comment.model";

export default async (req: Request, res: Response) => {
	try {
		if (!req.body.articleId || !req.body.content) {
			res.status(400).json({ msg: "articleId and content is required" });
			throw new Error("articleId and content is required");
		}
		const commentNew = new Comment({
			writer: req.userId,
			articleId: req.body.articleId,
			content: req.body.content
		});

		await commentNew.save();
	} catch (err) {
		console.log(err.messge);
		return res.status(500).json({ msg: "Internal Server Error" });
	}
};
