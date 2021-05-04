import React from "react";
import "./App.css";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import { Switch, Route } from "react-router-dom";
import dashboard from "./Components/dashboard";
function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/" component={SignUp} exact />
				<Route path="/login" component={Login} exact />
				<Route path="/user/:id" component={dashboard} exact />
			</Switch>
		</div>
	);
}

export default App;
