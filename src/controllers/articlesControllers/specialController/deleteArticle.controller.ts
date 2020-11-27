import { Request, Response } from "express";
import Article from "../../../models/article.model";

export default async (req: Request, res: Response) => {
	try {
		await Article.findByIdAndDelete(req.params.id);
		return res.status(200).json({ msg: "message deleted successfully" });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ msg: "Internal Server Error" });
	}
};
