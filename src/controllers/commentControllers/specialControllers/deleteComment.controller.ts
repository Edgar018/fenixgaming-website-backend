import { Request, Response } from "express";
import Comment from "../../../models/comment.model";

export default async (req: Request, res: Response) => {
	try {
		await Comment.findByIdAndDelete(req.params.id);
		return res.status(200).json({ msg: "comment deleted successfully" });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ msg: "Internal Server Error" });
	}
};
