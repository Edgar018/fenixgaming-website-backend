import { Request, Response } from "express";
import Article from "../../models/article.model";

export default async (req: Request, res: Response): Promise<Response> => {
	try {
		const articlesFound = Article.find();
		return res.status(200).json({ msg: articlesFound });
	} catch (err) {
		console.log(err);
		return res.status(500).json("Internal Server Error");
	}
};
