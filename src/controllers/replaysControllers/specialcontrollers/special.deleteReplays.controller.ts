import { Request, Response } from "express";
import Replay from "../../../models/replays.mode";
import { unlink } from "fs-extra";
import path from "path";

export default async (req: Request, res: Response) => {
	const replayFound = await Replay.findOneAndDelete({ _id: req.params.id });
	if (replayFound !== null) {
		unlink(path.resolve("./public/replays/" + replayFound.path));
		return res.status(200).json({ msg: "replay was deleted successfully" });
	}
	return res.status(400).json({ msg: "replay not found" });
};
