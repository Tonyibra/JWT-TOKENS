import React, { useState } from "react";
import axios from "axios";
const Login = () => {
	const [user, setUser] = useState();
	const [password, setPassword] = useState();
	const inputUser = (e) => {
		setUser(e.target.value);
	};
	const inputPassword = (e) => {
		setPassword(e.target.value);
	};

	const options = {
		headers: {
			name: user,
			password: password,
		},
	};
	const submit = async () => {
		const login = await axios.post(
			"http://localhost:5000/auth/login",
			options.headers
		);
	};
	return (
		<div className="login">
			<input onChange={inputUser} type="text" placeholder="username" />
			<input onChange={inputPassword} type="password" placeholder="password" />
			<button onClick={submit}>Login</button>
		</div>
	);
};

export default Login;
