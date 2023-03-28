import cfg from "./config";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { bearerToken } from "koa-bearer-token";
import routers from "./routers";
import passport from "./middlewares/passports";

const app = new Koa();

app.use(passport.initialize());
app.use(
	bodyParser({
		enableTypes: ["json"],
		extendTypes: ["application/json"],
		onerror: (err, ctx) => {
			return ctx.throw(422, "Body Parser error");
		},
	})
);
app.use(
	bearerToken({
		queryKey: "token",
		headerKey: "Bearer",
	})
);
app.use(routers());

app.listen(cfg("APP_PORT", parseInt), cfg("APP_HOST"));
console.info(
	`API Server started at http://%s:%d`,
	cfg("APP_HOST"),
	cfg("APP_PORT", parseInt)
);
