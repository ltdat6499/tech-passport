import Router from "koa-router";
import passport from "../middlewares/passports";

const router = new Router();

router.post("/v1/login", async (ctx) =>
	passport.authenticate("local", (err, token) => {
		ctx.body = { err, token };
	})(ctx)
);

router.get("/v1/facebook", passport.authenticate("facebook"));

router.get("/v1/facebook/callback", async (ctx) =>
	passport.authenticate("facebook", (err, token) => {
		ctx.body = { err, token };
	})(ctx)
);
router.get("/v1/zalo", passport.authenticate("zalo"));

router.get("/v1/zalo/callback", async (ctx) =>
	passport.authenticate("zalo", (err, token) => {
		ctx.body = { err, token };
	})(ctx)
);

export default router;
