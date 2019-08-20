import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogicMiddleware } from "redux-logic";
import user from "./engine/user";

// const configMiddle = ({http: () =>{}} = {}) => createLogicMiddleware([...user.processors])
// const configMiddle = () => createLogicMiddleware([...user.processors], {http, storage})
const configMiddle = () => createLogicMiddleware([...user.processors]);

const configurationForStore = deps =>
	composeWithDevTools(applyMiddleware(configMiddle()));

const reducers = combineReducers({
	[user.constants.nameSpace]: user.reducer
});

export default ({ deps } = {}) => {
	const store = createStore(reducers, configurationForStore(deps));
	// store.dispatch()
	return store;
};
