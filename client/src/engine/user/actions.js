import user from "./index";

export const changeWorking = working => ({
	type: user.constants.CHANGE_WORKING,
	payload: {
		working
	}
});
