import { createLogic } from "redux-logic";
import { map, tap } from "rxjs/operators";
import { defineAction } from "redux-define";
// import * as constants from "../constants";

const states = ["FULFILLED", "REJECTED", "CANCELLED"];
const oneAction = defineAction("THISPROC", states, "userreducer");

export const getUserLogic = createLogic({
	type: "neva", // type: constants.GET_USER.ACTION,
	processOptions: {
		successType: oneAction.FULFILLED,
		failType: oneAction.REJECTED
	},
	process({ http, storage, action }) {
		const { username: user } = action.payload;

		return http
	}
});
