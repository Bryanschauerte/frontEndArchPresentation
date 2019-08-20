import * as constants from "./constants";

const defaultState = {
	working: "yes im working"
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case constants.CHANGE_WORKING: {
			const { working } = action.payload;
			return { ...state, working };
		}
		default:
			return state;
	}
};
