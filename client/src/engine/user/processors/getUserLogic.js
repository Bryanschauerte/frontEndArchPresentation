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
			.post("/design-view/entity-user/queryv2", { logon_name: user })
			.pipe(
				map(http.getBody),
				map(resp => resp.data[0]),
				tap(entity => {
					if (entity.entity_user_guid) {
						storage.setUserId(entity.entity_user_guid);
					}
				}),
				map(entityData => ({
					username: entityData.entity_name,
					firstName: entityData.first_name,
					lastName: entityData.last_name,
					thumbnailPhoto: entityData.thumbnail_photo,
					entityUserGuid: entityData.entity_user_guid,
					entityGuid: entityData.entity_guid,
					email: entityData.contact_value_text
				}))
			);
	}
});
