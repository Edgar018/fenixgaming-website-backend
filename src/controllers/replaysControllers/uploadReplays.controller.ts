import { Request, Response } from "express";
import path from "path";
import util from "util";
import Replay from "../../models/replays.mode";
import { getDataOfReplay } from "../../libs/w3gjs/w3gjs";
import { pathOfTheRootProject } from "../../app";

export default async (req: Request, res: Response) => {
	try {
		if (req.files === undefined) throw new Error("files is undefined");
		const fileName = req.files.file.name;
		const size = req.files.file.data.length;

		if (fileName === undefined) throw new Error("fileName is undefined");

		const extension = path.extname(fileName);

		const allowedExtensions = /w3g/;

		if (!allowedExtensions.test(extension)) {
			res.status(400).json({ msg: "Unsupported extension" });
			throw new Error("Unsupported extension");
		}
		if (size === undefined) throw new Error("size is undefined");

		if (size > 5000000) {
			res.status(400).json({ msg: "File must be less than 5mb" });
			throw new Error("File must be less than 5mb");
		}

		const md5 = req.files.file.md5;
		const URL = "/public/replays/" + md5 + extension;
		await util.promisify(req.files.file.mv)(pathOfTheRootProject + URL);

		const replay = await getDataOfReplay(pathOfTheRootProject + URL);
		console.log(replay);

		const newReplay = new Replay({
			playerOne: replay.players[0],
			playerTwo: replay.players[1],
			matchup: replay.matchup,
			chat: replay.chat,
			version: replay.version,
      duration: replay.duration,
			path: md5
		});
		await newReplay.save();

		res.status(201).json({ msg: "file upload successfully" });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ msg: "Internal Server Error" });
	}
};
