import { Request, Response } from "express";
import Article from "../../../models/article.model";

export default async (req: Request, res: Response) => {
	try {
		Article.findByIdAndUpdate(req.params.id, req.body);
		return res.status(200).json({ msg: "article updated successfully" });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ msg: "Internal Server Error" });
	}
};
