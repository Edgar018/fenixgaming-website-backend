import User from "../../models/user.model";
import Roles from "../../models/roles.model";

export default async () => {
	const userFound = await User.findOne({ email: "admin@localhost.com" });
	const rolesFound = await Roles.findOne({ name: "admin" });

	if (!userFound && rolesFound) {
		await User.create({
			username: "admin",
			email: "admin@localhost.com",
			password: "123",
			roles: [rolesFound.id]
		});
		console.log("admin user created");
	}
};
