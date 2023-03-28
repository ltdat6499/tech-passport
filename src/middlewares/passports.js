import passport from "koa-passport";
import axios from "axios";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as ZaloStrategy } from "../libs/passport-zalo";
import cfg from "../config";

passport.use(
	new LocalStrategy(
		{
			usernameField: "phone",
			passwordField: "password",
		},
		async (phone, password, done) => {
			console.log(phone, password);
			done(null, "token");
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: cfg("FACEBOOK_CLIENT_ID"),
			clientSecret: cfg("FACEBOOK_CLIENT_SECRET"),
			callbackURL: cfg("FACEBOOK_CALLBACK_URL"),
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const data = await axios.get(
					`https://graph.facebook.com/v13.0/me?fields=${cfg(
						"FACEBOOK_SCOPES"
					)}&access_token=${accessToken}`
				);
				return done(null, data.data);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);

passport.use(
	new ZaloStrategy(
		{
			clientID: cfg("ZALO_CLIENT_ID"),
			clientSecret: cfg("ZALO_CLIENT_SECRET"),
			callbackURL: cfg("ZALO_CALLBACK_URL"),
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const data = await axios.get(
					`https://graph.zalo.me/v2.0/me?access_token=${accessToken}&fields=${cfg(
						"ZALO_SCOPES"
					)}`
				);
				return done(null, data.data);
			} catch (error) {
				return done(error, null);
			}
		}
	)
);

export default passport;
