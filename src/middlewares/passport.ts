import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import User from "../models/user.model";

const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.jwtSecret
};

export default new Strategy(options, async (payload, done) => {
	try {
		const userFound = await User.findById(payload.id);
		if (userFound) {
			return done(null, userFound);
		}

		return done(null, false);
	} catch (err) {
		console.error(err);
	}
});
