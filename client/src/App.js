import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import createStore from "./store";
import user from "./engine/user";
import Login from "./views/login/Login";

const styles = () => {};

function Tester({ working, changeWorking }) {
	return (
		<div>
			{working}
			<Button
				onClick={() => changeWorking("working SOOO hard")}
				color="primary"
			>
				sjsksjsk
			</Button>
			<Login />
		</div>
	);
}

const mapStateToProps = state => ({
	working: user.selectors.working(state)
});

const ConnectedT = connect(
	mapStateToProps,
	{
		changeWorking: user.actions.changeWorking
	}
)(withStyles(styles)(Tester));

const routesSetup = [
	{
		path: "/",
		component: <ConnectedT />
	}
];

function App() {
	const store = createStore();

	return (
		<div className="App">
			<CssBaseline />
			<Provider store={store}>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					{/* <ConnectedT /> */}
					<Router>
						{routesSetup.map(route => (
							<Route
								path={route.path}
								key={`${route.path}`}
								component={() => route.component}
							/>
						))}
					</Router>
				</header>
			</Provider>
		</div>
	);
}

export default App;
