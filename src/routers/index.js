import fs from "fs";
import path from "path";
import combineRouters from "koa-combine-routers";

const basename = path.basename(__filename);
const routers = [];

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".js" &&
			file !== "helpers.js"
		);
	})
	.forEach((file) => {
		routers.push(require(path.join(__dirname, file)).default);
	});

export default combineRouters(routers);
