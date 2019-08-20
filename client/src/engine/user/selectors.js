import { prop, compose } from "ramda";

export const user = compose(prop("User"));

export const working = compose(
	prop("working"),
	user
);
