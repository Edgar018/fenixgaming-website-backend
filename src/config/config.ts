export default {
	jwtSecret: process.env.JWT_SECRET || "jwtkey",
	DB: {
		URI: process.env.MONGODB_URI || "mongodb://localhost/mongodb",
		USER: process.env.USER,
		PASSWORD: process.env.PASSWORD
	}
};
