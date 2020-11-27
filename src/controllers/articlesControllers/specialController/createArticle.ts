import { Response, Request } from "express";
import Article from "../../../models/article.model";

export default async (req: Request, res: Response): Promise<Response | undefined> => {
	try {
		if (!req.body.title ||  !req.body.description || !req.body.markdown) {
			res.status(400).json("title, description and markdown is required");
			new Error("title, description and markdown is required");
		}
		const newArticle = new Article(req.body);
		await newArticle.save();
    return res.status(200).json("article created successfully");
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ msg: "internal server error" });
	}
};
