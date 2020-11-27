import { Request, Response } from "express";
import Article from "../../models/article.model";

export default async (req: Request, res: Response): Promise<Response | undefined> => {
	try {
		const articleFound = await Article.findOne({ slug: req.params.slug });
		if (articleFound === null) {
			res.status(404).json({ msg: "article not found" });
			new Error("article not found");
		}
		return res.status(200).json({ msg: articleFound });
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ msg: "Internal Server Error" });
	}
};
