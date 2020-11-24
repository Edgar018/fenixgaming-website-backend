import Roles from "../../models/roles.model";

export default async () => {
	try {
		const count = await Roles.estimatedDocumentCount();

		if (count > 0) return;

		await Promise.all([new Roles({ name: "user" }).save(), new Roles({ name: "admin" }).save()]);
	} catch (err) {
		console.error(err);
	}
};
